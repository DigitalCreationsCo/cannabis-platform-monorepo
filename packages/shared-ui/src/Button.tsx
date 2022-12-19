import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingDots from './LoadingDots';

interface ButtonProps extends PropsWithChildren {
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: React.ReactElement;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default function Button({ type, className, disabled, loading, onClick, children, ...props }: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled && loading}
            onClick={onClick}
            className={ twMerge(
                loading && 'cursor-not-allowed',
                'whitespace-nowrap',
                'font-semibold',
                'shadow-md',    
                'flex',
                'justify-center',
                'items-center',
                'px-4',
                'h-10',
                'my-2',
                'rounded-btn',
                'focus:outline-none',
                className
            )}
            {...props}
        >
            { loading ? <LoadingDots /> : children }
        </button>
    );
}
