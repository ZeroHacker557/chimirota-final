<<<<<<< HEAD
# Chimir ota Jome Masjidi - Backend API

Backend API service for the mosque website built with Node.js, Express, and SQLite.

## Features

- Prayer times management
- Events management
- Settings management
- Admin authentication
- Real-time updates with Socket.io
- Donation management

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `PUT /api/admin/update-profile` - Update admin profile

### Prayer Times
- `GET /api/prayer-times` - Get all prayer times
- `PUT /api/prayer-times` - Update prayer times

### Events
- `GET /api/events` - Get all active events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Settings
- `GET /api/settings` - Get all settings
- `PUT /api/settings` - Update settings

### Health Check
- `GET /` - API health check

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## Default Admin Credentials

- Email: `admin@chimirotajome.uz`
- Password: `Mosque@2025!`

## Database

Uses SQLite database with automatic initialization of default data including:
- Admin user
- Prayer times
- Settings
- Sample events

## Deployment

=======
# Chimir ota Jome Masjidi - Backend API

Backend API service for the mosque website built with Node.js, Express, and SQLite.

## Features

- Prayer times management
- Events management
- Settings management
- Admin authentication
- Real-time updates with Socket.io
- Donation management

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `PUT /api/admin/update-profile` - Update admin profile

### Prayer Times
- `GET /api/prayer-times` - Get all prayer times
- `PUT /api/prayer-times` - Update prayer times

### Events
- `GET /api/events` - Get all active events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Settings
- `GET /api/settings` - Get all settings
- `PUT /api/settings` - Update settings

### Health Check
- `GET /` - API health check

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## Default Admin Credentials

- Email: `admin@chimirotajome.uz`
- Password: `Mosque@2025!`

## Database

Uses SQLite database with automatic initialization of default data including:
- Admin user
- Prayer times
- Settings
- Sample events

## Deployment

>>>>>>> c0c2e7bf4c0d53866514fd0ca9a05734e82902f4
This API is designed to be deployed on Render.com as a Web Service.