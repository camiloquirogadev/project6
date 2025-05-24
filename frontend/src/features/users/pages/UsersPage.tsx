// src/features/users/pages/UsersPage.tsx
import { usePermissions } from '@/hooks/usePermissions';
import { Button } from '@/components/ui/Button';

export default function UsersPage() {
  const { can } = usePermissions();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Usuarios</h1>
      {can('user:create') && (
        <Button onClick={() => alert('Crear usuario')}>Crear Usuario</Button>
      )}
      {!can('user:create') && (
        <p className="text-gray-500">No tenés permiso para crear usuarios.</p>
      )}
    </div>
  );
}
