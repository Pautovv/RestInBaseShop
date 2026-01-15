import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    productItemId: number;
    className?: string;
}

export const ProductCart: React.FC<Props> = ({
    id,
    name,
    price,
    imageUrl,
    productItemId,
    className,
}) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}?itemId=${productItemId}`}>
                <div className='flex justify-center p-6 border border-secondary rounded-lg h-[260px]'>
                    <img src={imageUrl} alt={name} className='w-[215px] h-[215px]' />
                </div>

                <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        <b>{price} ₽</b>
                    </span>

                    <Button variant="secondary" className="text-base font-bold">
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    );
};
