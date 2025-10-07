import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';

// Public components
import Header from './components/Header';
import Hero from './components/Hero';
import PrayerTimes from './components/PrayerTimes';
import About from './components/About';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin components
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import PrayerTimesAdmin from './components/admin/PrayerTimesAdmin';
import EventsAdmin from './components/admin/EventsAdmin';
import SettingsAdmin from './components/admin/SettingsAdmin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Notification from './components/admin/Notification';

// Public website component
const PublicWebsite = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <main>
      <Hero />
      <About />
      <PrayerTimes />
      <Events />
      <Gallery />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<PublicWebsite />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="prayer-times" element={<PrayerTimesAdmin />} />
                <Route path="events" element={<EventsAdmin />} />
                <Route path="settings" element={<SettingsAdmin />} />
              </Route>
            </Routes>
            <Notification />
          </div>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;