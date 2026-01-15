'use client';

import React from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart-store';

interface Props {
    className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
    const totalAmount = useCartStore((state) => state.totalAmount);
    const items = useCartStore((state) => state.items);
    const loading = useCartStore((state) => state.loading);
    const count = items.length;

    return (
        <CartDrawer>
            <Button
                loading={loading}
                className={cn('group relative', { 'w-[105px]': loading }, className)}
            >
                <b>{totalAmount} ₽</b>
                <span className="h-full w-px bg-white/30 mx-3" />
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
                    <b>{count}</b>
                </div>
                <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
        </CartDrawer>
    );
};