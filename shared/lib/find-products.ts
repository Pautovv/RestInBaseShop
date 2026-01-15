import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    genders?: string;
    categories?: string;
    collections?: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findProductsByCategories = async (params: GetSearchParams) => {
    const collectionsIdArr = params.collections?.split(',').map(Number);
    const categoriesIdArr = params.categories?.split(',').map(Number);
    const sizes = params.sizes?.split(',');

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc'
                },
                where: {
                    categoryId: categoriesIdArr ? { in: categoriesIdArr } : undefined,
                    collectionId: collectionsIdArr ? { in: collectionsIdArr } : undefined,
                    items: {
                        some: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                            ...(sizes && sizes.length
                                ? {
                                    size: {
                                        in: sizes,
                                    },
                                }
                                : {}),
                        },
                    },
                },
                include: {
                    category: true,
                    collection: true,
                    items: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                            ...(sizes && sizes.length
                                ? {
                                    size: {
                                        in: sizes,
                                    },
                                }
                                : {}),
                        },
                        orderBy: {
                            price: 'asc',
                        },
                    },
                },
            },
        },
    });

    return categories;
};