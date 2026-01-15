'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFormLoginValues, formLoginSchema } from './schemas';
import { Title } from '../../../title';
import { FormInput } from '../../../form/form-input';
import { Button } from '@/shared/components/ui/button';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
    onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (!resp?.ok) throw Error();

            toast.success('Вы вошли!', { icon: '✅' });
            onClose?.();
        } catch (error) {
            toast.error('Ошибка авторизации', { icon: '❌' });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <Title text="Вход" size="md" className="font-bold mb-2" />
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="password" label="Пароль" type="password" required />
                <Button loading={form.formState.isSubmitting} className="h-10 text-base mt-2" type="submit">
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
};