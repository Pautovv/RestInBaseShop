import { Product, ProductItem } from "@prisma/client";

export type ProductWithItems = Product & { items: ProductItem[] }