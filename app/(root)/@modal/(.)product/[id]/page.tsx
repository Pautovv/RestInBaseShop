import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { ChooseProductModal } from '@/shared/components/shared';
import { ProductWithItems } from '@/@types/prisma';

type ProductModalProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ itemId?: string }>;
};

export default async function ProductModalPage(props: ProductModalProps) {
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
        <ChooseProductModal
            product={product as ProductWithItems}
            activeItemId={activeItemId}
        />
    );
}