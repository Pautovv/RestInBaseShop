import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    size?: string | null;
    color?: string | null;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => {
        const productItem = item.productItem;
        const product = productItem.product;

        return {
            id: item.id,
            quantity: item.quantity,
            name: product.name,
            imageUrl:
                productItem.imageFrontUrl ??
                product.imageFrontUrl ??
                product.imageBackUrl ??
                '',
            price: calcCartItemTotalPrice(item),
            size: productItem.size,
            color: productItem.color,
            disabled: false,
        };
    }) as CartStateItem[];

    return {
        items,
        totalAmount: data.totalAmount,
    };
};