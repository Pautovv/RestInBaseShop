import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants, Variant } from './group-variants';

interface Props {
    imageFrontUrl: string;
    imageBackUrl: string;
    name: string;
    price: number;
    onSubmit?: VoidFunction;
    className?: string;

    colorsVariants: readonly Variant[];
    selectedColor?: string;
    onChangeColor?: (value: string) => void;

    sizesVariants?: readonly Variant[];
    selectedSize?: string;
    onChangeSize?: (value: string) => void;

    loading?: boolean;
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageFrontUrl,
    imageBackUrl,
    price,
    className,
    onSubmit,

    colorsVariants,
    selectedColor,
    onChangeColor,

    sizesVariants = [],
    selectedSize,
    onChangeSize,

    loading,
}) => {
    return (
        <div className={cn(className, 'flex flex-1 gap-2')}>
            <div className="flex items-center justify-center flex-1 relative w-full gap-4">
                <img
                    src={imageFrontUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 h-[320px] w-auto max-w-[45%]"
                />
                <img
                    src={imageBackUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 h-[320px] w-auto max-w-[45%]"
                />
            </div>

            <div className="w-[450px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-4" />

                {colorsVariants.length > 0 && (
                    <div className="mb-4">
                        <GroupVariants
                            items={colorsVariants}
                            value={selectedColor}
                            onClick={onChangeColor}
                        />
                    </div>
                )}

                {sizesVariants.length > 0 && (
                    <div className="mb-6">
                        <GroupVariants
                            items={sizesVariants}
                            value={selectedSize}
                            onClick={onChangeSize}
                        />
                    </div>
                )}

                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    onClick={onSubmit}
                    loading={loading}
                >
                    Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div>
    );
};