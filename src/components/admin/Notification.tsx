import React, { useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Notification: React.FC = () => {
  const { notification, showNotification } = useAdmin();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        showNotification('', 'success'); // Clear notification
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, showNotification]);

  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg border ${
        notification.type === 'success' 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-red-50 border-red-200 text-red-800'
      }`}>
        {notification.type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-600" />
        )}
        <p className="font-medium">{notification.message}</p>
        <button
          onClick={() => showNotification('', 'success')}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Notification;