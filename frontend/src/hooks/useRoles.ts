import { useState, useEffect } from 'react';
import axios from '@/services/api';

export interface Role {
  _id?: string;
  name: string;
  permissions: string[];
}

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/roles');
      setRoles(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (role: Role) => {
    const res = await axios.post('/roles', role);
    setRoles(prev => [...prev, res.data]);
  };

  const updateRole = async (id: string, role: Role) => {
    const res = await axios.put(`/roles/${id}`, role);
    setRoles(prev => prev.map(r => (r._id === id ? res.data : r)));
  };

  const deleteRole = async (id: string) => {
    await axios.delete(`/roles/${id}`);
    setRoles(prev => prev.filter(r => r._id !== id));
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
  };
}
