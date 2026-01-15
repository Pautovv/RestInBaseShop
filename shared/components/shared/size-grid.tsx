import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Skeleton } from '../ui';

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface Props {
    className?: string;
    sizes: string[];
    selectedSizes: Set<string>;
    onToggleSize: (size: string) => void;
    loading?: boolean;
}

export const SizeGrid: React.FC<Props> = ({
    className,
    sizes,
    selectedSizes,
    onToggleSize,
    loading,
}) => {
    if (loading) {
        return (
            <div className={cn('grid grid-cols-3 gap-2', className)}>
                {ALL_SIZES.map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-10 rounded-xl bg-gray-200"
                    />
                ))}
            </div>
        );
    }

    const availableSet = new Set(sizes);

    return (
        <div className={cn('grid grid-cols-3 gap-2', className)}>
            {ALL_SIZES.map((name) => {
                const isAvailable = availableSet.has(name);
                const isActive = selectedSizes.has(name);

                return (
                    <button
                        key={name}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => isAvailable && onToggleSize(name)}
                        className={cn(
                            'h-10 border text-sm font-medium flex items-center justify-center transition-colors rounded-2xl',
                            'bg-white border-gray-200 text-gray-800',
                            isAvailable && 'hover:bg-gray-50 cursor-pointer',
                            !isAvailable && 'opacity-40 cursor-not-allowed bg-secondary',
                            isAvailable &&
                            isActive &&
                            'bg-black text-white border-black hover:bg-black'
                        )}
                    >
                        {name}
                    </button>
                );
            })}
        </div>
    );
};