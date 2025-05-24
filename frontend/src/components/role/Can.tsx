// src/components/role/Can.tsx
import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

export default function Can({ permission, children }: { permission: string; children: ReactNode }) {
  const { can } = usePermissions();
  return can(permission) ? <>{children}</> : null;
}
