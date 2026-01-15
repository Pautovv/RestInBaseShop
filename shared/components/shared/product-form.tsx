'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { ChooseProductForm } from './choose-product-form';
import { ProductWithItems } from '@/@types/prisma';
import { useCartStore } from '@/shared/store/cart-store';

const COLOR_LABELS: Record<string, string> = {
    black: 'Черный',
    white: 'Белый',
    red: 'Красный',
    blue: 'Синий',
    purple: 'Фиолетовый',
    green: 'Зелёный',
};

interface Props {
    product: ProductWithItems;
    activeItemId?: number;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
    product,
    activeItemId,
    onSubmit: closeModal,
}) => {
    const items = product.items;
    if (!items.length) return null;

    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    const colors = Array.from(
        new Set(
            items
                .map((item) => item.color?.trim())
                .filter((c): c is string => Boolean(c)),
        ),
    );

    const initialItem =
        (activeItemId ? items.find((i) => i.id === activeItemId) : undefined) ||
        items[0];

    const [selectedColor, setSelectedColor] = React.useState<string | undefined>(
        initialItem.color || colors[0],
    );

    const colorFilteredItems = items.filter(
        (item) => selectedColor ? item.color === selectedColor : true
    );

    const sizes = Array.from(
        new Set(
            colorFilteredItems
                .map((item) => item.size?.trim())
                .filter((s): s is string => Boolean(s)),
        ),
    );

    const [selectedSize, setSelectedSize] = React.useState<string | undefined>(
        sizes[0]
    );

    const activeItem =
        colorFilteredItems.find(
            (item) => selectedSize ? item.size === selectedSize : true
        ) || initialItem;

    const sizeVariants = sizes.map((size) => ({
        name: size,
        value: size,
        disabled: false, 
    }));

    const colorVariants = colors.map((color) => ({
        name: COLOR_LABELS[color] ?? color,
        value: color,
        disabled: false,
    }));

    const handleSubmit = async () => {
        const targetItem =
            items.find(
                (item) =>
                    (selectedColor ? item.color === selectedColor : true) &&
                    (selectedSize ? item.size === selectedSize : true)
            ) || initialItem;

        if (!targetItem) {
            toast.error('Не удалось определить вариацию товара');
            return;
        }

        await addCartItem({ productItemId: targetItem.id });

        toast.success(product.name + ' добавлен(а) в корзину');

        closeModal?.();
    };

    return (
        <ChooseProductForm
            imageFrontUrl={activeItem.imageFrontUrl || ''}
            imageBackUrl={
                activeItem.imageBackUrl || activeItem.imageFrontUrl || ''
            }
            name={product.name}
            price={activeItem.price}
            colorsVariants={colorVariants}
            selectedColor={selectedColor}
            onChangeColor={value => {
                setSelectedColor(value);
                const newSizes = Array.from(
                    new Set(
                        items
                            .filter((item) => value ? item.color === value : true)
                            .map((item) => item.size?.trim())
                            .filter((s): s is string => Boolean(s)),
                    ),
                );
                setSelectedSize(newSizes[0]);
            }}
            sizesVariants={sizeVariants}
            selectedSize={selectedSize}
            onChangeSize={setSelectedSize}
            onSubmit={handleSubmit}
            loading={loading}
        />
    );
};