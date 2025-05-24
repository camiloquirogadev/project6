// src/hooks/usePermissions.ts
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

interface User {
  permissions: string[];
  // otros campos como id, email, role si es necesario
}

interface AuthContextType {
  user?: User;
}

export function usePermissions() {
  const context = useContext(AuthContext) as AuthContextType | undefined;
  const user = context?.user;

  const can = (permission: string): boolean => {
    if (!user?.permissions) return false;
    return user.permissions.includes(permission);
  };

  return { can };
}
