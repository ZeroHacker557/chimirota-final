# 🕌 Chimir ota Jome Masjidi - Backend API

REST API server for the Chimir ota Jome Masjidi website with real-time updates.

## 🚀 Features

- **Prayer Times Management** - CRUD operations for daily prayer schedules
- **Events Management** - Mosque events and announcements
- **Admin Authentication** - Secure admin login system
- **Settings Management** - Configurable mosque information and settings
- **Real-time Updates** - Socket.io for live data synchronization
- **SQLite Database** - Lightweight database solution

## 📡 API Endpoints

### Prayer Times
- `GET /api/prayer-times` - Get all prayer times
- `PUT /api/prayer-times` - Update prayer times

### Events
- `GET /api/events` - Get active events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Settings
- `GET /api/settings` - Get all settings
- `PUT /api/settings` - Update settings

### Admin
- `POST /api/admin/login` - Admin authentication
- `PUT /api/admin/update-profile` - Update admin profile

### Health Check
- `GET /` - Server status
- `GET /api/health` - API health check

## 🛠️ Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing

## 🌍 Environment Variables

```env
NODE_ENV=production
FRONTEND_URL=https://chimirota-final.vercel.app
PORT=3001
```

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone YOUR_REPO_URL
cd chimirota-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

## 🚀 Deployment to Render.com

1. **Push to GitHub**
2. **Connect repository to Render**
3. **Configure deployment:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node.js

## 🔧 Default Configuration

- **Admin Login:**
  - Email: `admin@chimirotajome.uz`
  - Password: `Mosque@2025!`

- **Server Port:** 3001 (development) / 10000 (Render)
- **Database:** SQLite with auto-initialization

## 📋 Project Structure

```
chimirota-backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── render.yaml            # Render deployment config
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🔒 Security Features

- CORS configuration for production
- Environment-based configuration
- Secure admin authentication
- Input validation and error handling

## 📞 Support

For technical support, contact the development team or refer to the deployment guide.

---

**Live API:** https://chimirota-backend.onrender.com  
**Frontend:** https://chimirota-final.vercel.app