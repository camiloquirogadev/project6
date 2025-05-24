// src/pages/Notifications.tsx
import { useNotifications } from '@/hooks/useNotifications';

export default function NotificationsPage() {
  const { notifications, markAllAsRead } = useNotifications();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>

      <div className="mb-4">
        <button
          onClick={markAllAsRead}
          className="btn btn-primary"
        >
          Marcar todas como leídas
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No hay notificaciones.</p>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`p-4 border rounded-md ${
                n.read ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-800'
              }`}
            >
              <p className="font-medium">{n.message}</p>
              <p className="text-sm">{new Date(n.date).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
