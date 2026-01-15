'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { ProductForm } from '../product-form';
import { ProductWithItems } from '@/@types/prisma';

interface Props {
    product: ProductWithItems;
    activeItemId?: number;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({
    product,
    activeItemId,
    className,
}) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}
            >
                <VisuallyHidden>
                    <DialogTitle>{product.name}</DialogTitle>
                </VisuallyHidden>

                <ProductForm
                    product={product}
                    activeItemId={activeItemId}
                    onSubmit={() => router.back()}
                />
            </DialogContent>
        </Dialog>
    );
};