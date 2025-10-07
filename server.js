const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

// Environment configuration
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';

// CORS configuration for production
const getAllowedOrigins = () => {
  if (NODE_ENV === 'production') {
    return [
      FRONTEND_URL,
      'https://chimirota-final.vercel.app',
      'https://chimirota-final.vercel.app/',
      'https://chimirotajome.vercel.app',
      'https://chimirotajome.vercel.app/',
      /\.vercel\.app$/,
      /\.onrender\.com$/
    ];
  }
  return ["http://localhost:5173", "http://localhost:5174"];
};

// Socket.io with dynamic CORS
const io = new Server(server, {
  cors: {
    origin: getAllowedOrigins(),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = getAllowedOrigins();
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      }
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.get('origin')}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Chimir ota Jome Masjidi API Server',
    status: 'running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Database setup with proper path for production
const dbPath = NODE_ENV === 'production' ? '/tmp/mosque.db' : './mosque.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to SQLite database at:', dbPath);
});

// Create tables
db.serialize(() => {
  // Admin users table
  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Prayer times table
  db.run(`CREATE TABLE IF NOT EXISTS prayer_times (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    time TEXT NOT NULL,
    arabic TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Settings table
  db.run(`CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    category TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Events table
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT,
    image TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default admin user if empty
  db.get("SELECT COUNT(*) as count FROM admin_users", (err, row) => {
    if (row.count === 0) {
      const defaultAdmin = {
        email: 'admin@chimirotajome.uz',
        password: 'Mosque@2025!', // Correct admin password
        name: 'Mosque Administrator',
        role: 'admin'
      };

      db.run(
        "INSERT INTO admin_users (email, password, name, role) VALUES (?, ?, ?, ?)",
        [defaultAdmin.email, defaultAdmin.password, defaultAdmin.name, defaultAdmin.role],
        function(err) {
          if (err) {
            console.error('Error creating default admin:', err);
          } else {
            console.log('Default admin user created');
          }
        }
      );
    }
  });

  // Insert default prayer times if empty
  db.get("SELECT COUNT(*) as count FROM prayer_times", (err, row) => {
    if (row.count === 0) {
      const defaultPrayerTimes = [
        { name: 'Bomdod', time: '05:30', arabic: 'فجر' },
        { name: 'Peshin', time: '12:15', arabic: 'ظهر' },
        { name: 'Asr', time: '15:45', arabic: 'عصر' },
        { name: 'Shom', time: '18:20', arabic: 'مغرب' },
        { name: 'Hufton', time: '19:45', arabic: 'عشاء' }
      ];

      const stmt = db.prepare("INSERT INTO prayer_times (name, time, arabic) VALUES (?, ?, ?)");
      defaultPrayerTimes.forEach(prayer => {
        stmt.run(prayer.name, prayer.time, prayer.arabic);
      });
      stmt.finalize();
    }
  });

  // Insert default settings if empty
  db.get("SELECT COUNT(*) as count FROM settings", (err, row) => {
    if (row.count === 0) {
      const defaultSettings = [
        // Mosque Information
        { key: 'mosque_name', value: 'Chimir ota Jome Masjidi', category: 'mosque_info' },
        { key: 'mosque_address', value: 'Toshkent Shahri Shayhontohur tumani\nYangi toshmi Chimir ota masjidi\nToshkent, O\'zbekiston', category: 'mosque_info' },
        { key: 'mosque_phone', value: '+998 12 345 6789', category: 'mosque_info' },
        { key: 'mosque_email', value: 'info@chimirotajome.uz', category: 'mosque_info' },
        { key: 'mosque_website', value: 'https://chimirotajome.uz', category: 'mosque_info' },
        { key: 'mosque_description', value: 'Jamiyatimizga xizmat qiluvchi ibodat, bilim va birlik maskani.', category: 'mosque_info' },
        
        // Social Media
        { key: 'social_facebook', value: 'https://facebook.com/chimirotajome', category: 'social_media' },
        { key: 'social_instagram', value: 'https://instagram.com/chimirotajome', category: 'social_media' },
        { key: 'social_telegram', value: 'https://t.me/chimirotajome', category: 'social_media' },
        
        // Footer Settings
        { key: 'footer_copyright', value: '© 2025 Chimir ota Jome Masjidi. Barcha huquqlar himoyalangan.', category: 'footer' },
        { key: 'footer_additional_text', value: 'Ibodat va birlik maskani', category: 'footer' },
        
        // Contact Settings
        { key: 'contact_office_hours', value: '9:00 dan 18:00 gacha', category: 'contact' },
        { key: 'contact_friday_prayer', value: '12:30', category: 'contact' },
        
        // Donation Settings
        { key: 'donation_title', value: '𝐌𝐚𝐬𝐣𝐢𝐝 𝐮𝐜𝐡𝐮𝐧 𝐞𝐡𝐬𝐨𝐧', category: 'donation' },
        { key: 'donation_description', value: 'Allah yo\'lida ehson qiling va masjidimizning faoliyatini qo\'llab-quvvatlashda ishtirok eting', category: 'donation' },
        { key: 'donation_account_number', value: '20212000700124304001', category: 'donation' },
        { key: 'donation_mfo', value: '00901', category: 'donation' },
        { key: 'donation_inn', value: '202465253', category: 'donation' },
        { key: 'donation_contact_phone', value: '974779411', category: 'donation' },
        { key: 'donation_payme_link', value: 'https://payme.uz/fallback/merchant/?id=6261544f84e4da44d89eb31c', category: 'donation' },
        { key: 'donation_payme_text', value: 'Ehson qilish', category: 'donation' },
        { key: 'donation_click_code', value: '*880*047452*summa#', category: 'donation' },
        { key: 'donation_click_text', value: 'Kodni nusxalash', category: 'donation' }
      ];

      const stmt = db.prepare("INSERT INTO settings (key, value, category) VALUES (?, ?, ?)");
      defaultSettings.forEach(setting => {
        stmt.run(setting.key, setting.value, setting.category);
      });
      stmt.finalize();
    }
  });
  db.get("SELECT COUNT(*) as count FROM events", (err, row) => {
    if (row.count === 0) {
      const defaultEvents = [
        {
          title: 'Juma namozi',
          date: '2025-01-24',
          time: '12:30',
          description: 'Haftalik jamoat namoziga qo\'shiling va ilhomli nutq eshiting.',
          detailed_description: 'Har hafta Juma kuni bo\'lib o\'tadigan masjid jamoasi namozi. Namozdan keyin imam tomonidan ilhomli va o\'gituvchi nutq aytiladi. Barcha erkak musulmonlar uchun talab etiladi. Namoz vaqti 12:30 da boshlanadi. Namozdan oldin va keyin do\'a qilinadi.',
          image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
          status: 'active'
        },
        {
          title: 'Jamoat iftori',
          date: '2025-01-28',
          time: '18:00',
          description: 'Oylik jamoat kechki ovqati - oilalarni birlashtirish uchun.',
          detailed_description: 'Har oyning oxirida bo\'lib o\'tadigan jamoat iftori. Barcha oilalar va jamiyat a\'zolari taklif qilinadi. Iftor vaqti 18:00 da boshlanadi. Ovqat bepul taqdim etiladi. Bu tadbirning maqsadi jamiyat a\'zolari o\'rtasida muloqot va do\'stlikni mustahkamlash.',
          image: 'https://images.pexels.com/photos/6419721/pexels-photo-6419721.jpeg?auto=compress&cs=tinysrgb&w=800',
          status: 'active'
        }
      ];

      const stmt = db.prepare("INSERT INTO events (title, date, time, description, detailed_description, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
      defaultEvents.forEach(event => {
        stmt.run(event.title, event.date, event.time, event.description, event.detailed_description, event.image, event.status);
      });
      stmt.finalize();
    }
  });
});

// API Routes

// Get prayer times
app.get('/api/prayer-times', (req, res) => {
  db.all("SELECT * FROM prayer_times ORDER BY id", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Update prayer times
app.put('/api/prayer-times', (req, res) => {
  const { prayerTimes } = req.body;
  
  if (!prayerTimes || !Array.isArray(prayerTimes)) {
    res.status(400).json({ error: 'Prayer times array is required' });
    return;
  }

  // Clear existing prayer times
  db.run("DELETE FROM prayer_times", (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Insert new prayer times
    const stmt = db.prepare("INSERT INTO prayer_times (name, time, arabic) VALUES (?, ?, ?)");
    prayerTimes.forEach(prayer => {
      stmt.run(prayer.name, prayer.time, prayer.arabic);
    });
    stmt.finalize((err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      // Emit to all connected clients
      io.emit('prayer-times-updated', prayerTimes);
      
      res.json({ message: 'Prayer times updated successfully', prayerTimes });
    });
  });
});

// Get events
app.get('/api/events', (req, res) => {
  db.all("SELECT * FROM events WHERE status = 'active' ORDER BY date", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add event
app.post('/api/events', (req, res) => {
  const { title, date, time, description, detailed_description, image, status = 'active' } = req.body;
  
  db.run(
    "INSERT INTO events (title, date, time, description, detailed_description, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, date, time, description, detailed_description, image, status],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const newEvent = {
        id: this.lastID,
        title,
        date,
        time,
        description,
        detailed_description,
        image,
        status
      };

      // Emit to all connected clients
      io.emit('event-added', newEvent);
      
      res.json({ message: 'Event added successfully', event: newEvent });
    }
  );
});

// Update event
app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { title, date, time, description, detailed_description, image, status } = req.body;
  
  db.run(
    "UPDATE events SET title = ?, date = ?, time = ?, description = ?, detailed_description = ?, image = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [title, date, time, description, detailed_description, image, status, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (this.changes === 0) {
        res.status(404).json({ error: 'Event not found' });
        return;
      }

      // Emit to all connected clients
      io.emit('event-updated', { id: parseInt(id), title, date, time, description, detailed_description, image, status });
      
      res.json({ message: 'Event updated successfully' });
    }
  );
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  
  db.run("DELETE FROM events WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    // Emit to all connected clients
    io.emit('event-deleted', parseInt(id));
    
    res.json({ message: 'Event deleted successfully' });
  });
});

// Settings API Routes

// Get all settings
app.get('/api/settings', (req, res) => {
  db.all("SELECT * FROM settings ORDER BY category, key", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Group settings by category
    const groupedSettings = rows.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = {};
      }
      acc[setting.category][setting.key] = setting.value;
      return acc;
    }, {});
    
    res.json(groupedSettings);
  });
});

// Update settings
app.put('/api/settings', (req, res) => {
  const { settings } = req.body;
  
  if (!settings || typeof settings !== 'object') {
    res.status(400).json({ error: 'Settings object is required' });
    return;
  }

  // Flatten the settings object
  const flatSettings = [];
  Object.keys(settings).forEach(category => {
    Object.keys(settings[category]).forEach(key => {
      flatSettings.push({
        key,
        value: settings[category][key],
        category
      });
    });
  });

  // Use transaction to update all settings
  db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO settings (key, value, category, updated_at) 
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `);
    
    let errors = [];
    let completed = 0;
    
    flatSettings.forEach(setting => {
      stmt.run(setting.key, setting.value, setting.category, (err) => {
        if (err) {
          errors.push(err.message);
        }
        completed++;
        
        if (completed === flatSettings.length) {
          stmt.finalize();
          
          if (errors.length > 0) {
            db.run("ROLLBACK");
            res.status(500).json({ error: 'Failed to update settings', details: errors });
          } else {
            db.run("COMMIT");
            
            // Emit to all connected clients
            io.emit('settings-updated', settings);
            
            res.json({ message: 'Settings updated successfully', settings });
          }
        }
      });
    });
  });
});

// Admin Profile API Routes

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ error: 'Email va parol talab qilinadi' });
    return;
  }

  db.get(
    "SELECT id, email, name, role FROM admin_users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!user) {
        res.status(401).json({ error: 'Noto\'g\'ri email yoki parol' });
        return;
      }

      res.json({ 
        message: 'Muvaffaqiyatli kirdingiz',
        user: {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    }
  );
});

// Admin login verification and profile update
app.put('/api/admin/update-profile', (req, res) => {
  const { currentEmail, currentPassword, newEmail, newPassword } = req.body;
  
  if (!currentEmail || !currentPassword) {
    res.status(400).json({ error: 'Joriy email va parol talab qilinadi' });
    return;
  }

  // Verify current credentials
  db.get(
    "SELECT * FROM admin_users WHERE email = ? AND password = ?",
    [currentEmail, currentPassword],
    (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!user) {
        res.status(401).json({ error: 'Joriy parol noto\'g\'ri' });
        return;
      }

      // Prepare update data
      let updateFields = [];
      let updateValues = [];
      
      if (newEmail && newEmail !== currentEmail) {
        updateFields.push('email = ?');
        updateValues.push(newEmail);
      }
      
      if (newPassword) {
        updateFields.push('password = ?');
        updateValues.push(newPassword);
      }
      
      updateFields.push('updated_at = CURRENT_TIMESTAMP');
      updateValues.push(user.id);

      if (updateFields.length === 1) { // Only timestamp update
        res.status(400).json({ error: 'Yangilanishi kerak bo\'lgan ma\'lumot topilmadi' });
        return;
      }

      // Update user profile
      const updateQuery = `UPDATE admin_users SET ${updateFields.join(', ')} WHERE id = ?`;
      
      db.run(updateQuery, updateValues, function(err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            res.status(400).json({ error: 'Bu email manzil allaqachon ishlatilmoqda' });
          } else {
            res.status(500).json({ error: err.message });
          }
          return;
        }

        if (this.changes === 0) {
          res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
          return;
        }

        // Return success with updated email if changed
        const response = { 
          message: 'Profil muvaffaqiyatli yangilandi',
          ...(newEmail && { newEmail })
        };
        
        res.json(response);
      });
    }
  );
});

// Get specific setting
app.get('/api/settings/:key', (req, res) => {
  const { key } = req.params;
  
  db.get("SELECT * FROM settings WHERE key = ?", [key], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Setting not found' });
      return;
    }
    
    res.json(row);
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mosque API is running' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Mosque API server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for real-time updates`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`📍 Database: ${dbPath}`);
  console.log(`🔒 CORS allowed origins:`, getAllowedOrigins());
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});
