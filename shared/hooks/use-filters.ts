import { useSearchParams } from "next/navigation";
import { useSet } from 'react-use';
import React from 'react';

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    collections: string;
    categories: string,
    sizes: string;
}

export interface Filters {
    selectedCollections: Set<string>;
    selectedCategories: Set<string>;
    selectedSizes: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setSelectedCollections: (value: string) => void
    setSelectedCategories: (value: string) => void
    setSelectedSizes: (value: string) => void
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [selectedCollections, { toggle: toggleCollections }] = useSet(
        new Set<string>(searchParams.get('collections')?.split(',')),
    );

    const [selectedCategories, { toggle: toggleCategories }] = useSet(
        new Set<string>(searchParams.get('categories')?.split(',')),
    );

    const [selectedSizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.get('sizes')?.split(',')),
    );

    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return React.useMemo(
        () => ({
            prices,
            setPrices: updatePrice,
            selectedCollections,
            selectedCategories,
            selectedSizes,
            setSelectedCollections: toggleCollections,
            setSelectedCategories: toggleCategories,
            setSelectedSizes: toggleSizes,
        }), [prices, selectedCollections, selectedCategories, selectedSizes],
    );
};