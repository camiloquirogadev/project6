import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../validations/userSchema';
import { createUser } from '../services/userService';

export default function UserManagement() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  const onSubmit = async (data: any) => {
    await createUser(data);
    alert('Usuario creado');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md">
      <div className="mb-4">
        <label className="block">Nombre</label>
        <input {...register('name')} className="input" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block">Email</label>
        <input {...register('email')} className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block">Rol</label>
        <select {...register('role')} className="input">
          <option value="admin">Admin</option>
          <option value="client">Cliente</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary">Crear usuario</button>
    </form>
  );
}
