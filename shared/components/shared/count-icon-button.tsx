import { Minus, Plus } from 'lucide-react';
import { CountButtonProps } from './count-button';
import { Button } from '../ui/button';
import { cn } from '@/shared/lib/utils';

interface IconButtonProps {
    size?: CountButtonProps['size'];
    disabled?: boolean;
    type?: 'plus' | 'minus';
    onClick?: () => void;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
    size = 'sm',
    disabled,
    type,
    onClick,
}) => {
    const iconSizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

    return (
        <Button
            variant="outline"
            size="icon" 
            disabled={disabled}
            onClick={onClick}
            type="button"
            className={cn(
                'hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
            )}
        >
            {type === 'plus' ? (
                <Plus className={iconSizeClass} />
            ) : (
                <Minus className={iconSizeClass} />
            )}
        </Button>
    );
};