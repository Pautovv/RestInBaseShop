import { CartStateItem } from './get-cart-details';

const COLOR_LABELS: Record<string, string> = {
    black: 'Черный',
    white: 'Белый',
    red: 'Красный',
    blue: 'Синий',
    purple: 'Фиолетовый',
    green: 'Зелёный',
};

export const getCartItemDetails = (
    size?: CartStateItem['size'],
    color?: CartStateItem['color'],
): string => {
    const parts: string[] = [];

    if (size) {
        parts.push(`Размер: ${size}`);
    }

    if (color) {
        parts.push(`Цвет: ${COLOR_LABELS[color] ?? color}`);
    }

    return parts.join(', ');
};