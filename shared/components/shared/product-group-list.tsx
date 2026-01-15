import React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { ProductCart } from './product-cart';
import { ProductWithItems } from '@/@types/prisma';

interface Props {
    title: string;
    items: ProductWithItems[];
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    listClassName,
    className,
}) => {
    return (
        <div className={className} id={title}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.map((product) => {
                    const firstItem = product.items[0];
                    if (!firstItem) return null;

                    return (
                        <ProductCart
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={firstItem.imageFrontUrl || ''}
                            price={firstItem.price}
                            productItemId={firstItem.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};