import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Correo inválido'),
  role: z.enum(['admin', 'client']),
});
