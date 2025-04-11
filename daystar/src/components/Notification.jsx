// src/components/Notifications.jsx
import React from 'react';
import { useNotifications } from '../context/NotificationContext';

const Notifications = ({ role }) => {
  const { notifications, removeNotification } = useNotifications();
  const filteredNotifications = notifications.filter(n => n.role === 'all' || n.role === role);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-h-[80vh] overflow-y-auto">
      {filteredNotifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
            n.type === 'success' ? 'bg-green-100 text-green-800' :
            n.type === 'error' ? 'bg-red-100 text-red-800' :
            n.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}
        >
          <div>
            <p>{n.message}</p>
            <p className="text-sm opacity-75">{new Date(n.timestamp).toLocaleTimeString()}</p>
          </div>
          <button onClick={() => removeNotification(n.id)} className="ml-4 text-lg font-bold">×</button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;