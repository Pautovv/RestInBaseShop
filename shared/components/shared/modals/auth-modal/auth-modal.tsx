'use client';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
    const [type, setType] = React.useState<'login' | 'register'>('login');

    const onSwitchType = () => setType(type === 'login' ? 'register' : 'login');
    const handleClose = () => onClose();

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[400px] bg-white p-8">
                {type === 'login' ? (
                    <LoginForm onClose={handleClose} />
                ) : (
                    <RegisterForm onClose={handleClose} />
                )}

                <div className="mt-4 flex flex-col gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => signIn('google', { callbackUrl: '/', redirect: true })}
                        type="button"
                        className="gap-2 h-10 flex-1"
                    >
                        <img className="w-5 h-5" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
                        Войти через Google
                    </Button>
                    <Button variant="outline" onClick={onSwitchType} type="button" className="h-10 mt-2">
                        {type !== 'login' ? 'Войти' : 'Регистрация'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};