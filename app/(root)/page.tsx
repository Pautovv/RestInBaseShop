import {
  Container,
  Filters,
  ProductsGroupList,
  Title
} from '@/shared/components';
import { type GetSearchParams, findProductsByCategories } from '@/shared/lib/find-products';
import { Suspense } from "react";
import Stories from './StoriesWrapper';

type HomeProps = {
  searchParams: Promise<GetSearchParams>;
};

export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;
  const categories = await findProductsByCategories(searchParams);

  return (
    <>
      <Container className='mt-5'>
        <Title text='Все товары' size='lg' className='font-extrabold' />
      </Container>

      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) =>
                category.products.length ? (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    items={category.products}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}