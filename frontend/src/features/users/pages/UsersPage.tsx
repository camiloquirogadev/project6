// features/users/pages/UsersPage.tsx
import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
