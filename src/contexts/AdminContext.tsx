import React, { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface PrayerTime {
  name: string;
  time: string;
  arabic: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  detailed_description?: string;
  image: string;
  status: 'active' | 'draft' | 'cancelled';
}

interface AdminContextType {
  prayerTimes: PrayerTime[];
  events: Event[];
  updatePrayerTimes: (times: PrayerTime[]) => Promise<void>;
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (id: number, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  showNotification: (message: string, type: 'success' | 'error') => void;
  notification: { message: string; type: 'success' | 'error' } | null;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Initialize socket connection and load data
  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Load prayer times from API
    const loadPrayerTimes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/prayer-times');
        if (response.ok) {
          const data = await response.json();
          setPrayerTimes(data);
        }
      } catch (error) {
        console.error('Error loading prayer times:', error);
      }
    };

    // Load events from API
    const loadEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    // Load initial data
    Promise.all([loadPrayerTimes(), loadEvents()]).then(() => {
      setIsLoading(false);
    });

    // Listen for real-time updates
    newSocket.on('prayer-times-updated', (updatedPrayerTimes) => {
      setPrayerTimes(updatedPrayerTimes);
    });

    newSocket.on('event-added', (newEvent) => {
      setEvents(prev => [...prev, newEvent]);
    });

    newSocket.on('event-updated', (updatedEvent) => {
      setEvents(prev => prev.map(event => 
        event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
      ));
    });

    newSocket.on('event-deleted', (eventId) => {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const updatePrayerTimes = async (times: PrayerTime[]) => {
    try {
      const response = await fetch('http://localhost:3001/api/prayer-times', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prayerTimes: times }),
      });

      if (response.ok) {
        const result = await response.json();
        setPrayerTimes(result.prayerTimes);
        showNotification('Prayer times updated successfully!', 'success');
      } else {
        throw new Error('Failed to update prayer times');
      }
    } catch (error) {
      console.error('Error updating prayer times:', error);
      showNotification('Failed to update prayer times. Please try again.', 'error');
    }
  };

  const addEvent = async (event: Omit<Event, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const result = await response.json();
        setEvents(prev => [...prev, result.event]);
        showNotification('Event added successfully!', 'success');
      } else {
        throw new Error('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      showNotification('Failed to add event. Please try again.', 'error');
    }
  };

  const updateEvent = async (id: number, eventUpdate: Partial<Event>) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventUpdate),
      });

      if (response.ok) {
        showNotification('Event updated successfully!', 'success');
      } else {
        throw new Error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      showNotification('Failed to update event. Please try again.', 'error');
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showNotification('Event deleted successfully!', 'success');
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      showNotification('Failed to delete event. Please try again.', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const value = {
    prayerTimes,
    events,
    updatePrayerTimes,
    addEvent,
    updateEvent,
    deleteEvent,
    showNotification,
    notification,
    isLoading
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading mosque data...</p>
        </div>
      </div>
    );
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};