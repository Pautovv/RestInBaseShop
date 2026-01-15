import { z } from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Минимум 4 символа' });

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema.extend({
    fullName: z.string().min(2, { message: 'Введите ФИО' }),
    confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;