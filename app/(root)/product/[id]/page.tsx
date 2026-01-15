import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container } from '@/shared/components/shared';
import { ProductWithItems } from '@/@types/prisma';
import { ProductForm } from '@/shared/components/shared/product-form';

type ProductModalProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ itemId?: string }>;
};

export default async function ProductPage(props: ProductModalProps) {
    const { id } = await props.params;
    const { itemId } = await props.searchParams;

    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: { items: true },
    });

    if (!product) {
        return notFound();
    }

    const activeItemId = itemId ? Number(itemId) : undefined;

    return (
        <Container className="flex flex-col my-10">
            <ProductForm
                product={product as ProductWithItems}
                activeItemId={activeItemId}
            />
        </Container>
    );
}