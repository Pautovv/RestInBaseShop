'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { SizeGrid } from './size-grid';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useCategories, useCollections, useFilters, useQueryFilters, useSizes } from '@/shared/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { collections, loading: collectionsLoading } = useCollections();
  const { categories, loading: categoriesLoading } = useCategories();
  const { sizes, loading: sizesLoading } = useSizes();

  const filters = useFilters();

  useQueryFilters(filters);

  const collectionsItems = collections.map((item) => ({ value: String(item.id), text: item.name }))
  const categoriesItems = categories.map((item) => ({ value: String(item.id), text: item.name }))

  const updatePrices = (prices: number[]) => {
    console.log(prices, 999);
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <div className='mt-5 border-t border-t-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Размеры:</p>
        <SizeGrid
          className="mt-2"
          sizes={sizes}
          selectedSizes={filters.selectedSizes}
          onToggleSize={filters.setSelectedSizes}
          loading={sizesLoading}
        />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Категории:"
        name="categories"
        className="mt-5"
        limit={6}
        defaultItems={categoriesItems.slice(0, 6)}
        items={categoriesItems}
        loading={categoriesLoading}
        onClickCheckbox={filters.setSelectedCategories}
        selected={filters.selectedCategories}
      />

      <CheckboxFiltersGroup
        title="Коллекции:"
        name="collections"
        className="mt-5"
        limit={6}
        defaultItems={collectionsItems.slice(0, 6)}
        items={collectionsItems}
        loading={collectionsLoading}
        onClickCheckbox={filters.setSelectedCollections}
        selected={filters.selectedCollections}
      />

    </div>
  );
};
