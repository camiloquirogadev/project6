import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserPlus, Shield } from 'lucide-react';
import Card from '../components/ui/Card';

const mockUsers = [
  { id: '1', name: 'Camilo Quiroga', email: 'camilo@example.com', role: 'Admin' },
  { id: '2', name: 'Alin Brena', email: 'alin@example.com', role: 'Client' }
];

export default function UsersPage() {
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    document.title = id ? 'User Detail | Zowu' : 'Team | Zowu';
  }, [id]);

  if (id) {
    const user = mockUsers.find(u => u.id === id);
    if (!user) return <p className="text-red-500">User not found</p>;

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">User Detail</h1>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <Link to="/users" className="text-blue-600 hover:underline mt-4 inline-block">← Back to Team</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield size={22} /> Team Members
        </h1>
        <button className="btn btn-primary flex items-center gap-2 text-sm">
          <UserPlus size={16} /> Add User
        </button>
      </div>

      <Card title="All Users">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Role</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map(user => (
              <tr key={user.id} className="border-t dark:border-gray-700">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <Link to={`/users/${user.id}`} className="text-blue-600 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

