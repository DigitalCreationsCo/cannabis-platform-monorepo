import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Center from './Center';
import LoadingDots from './LoadingDots';

interface ButtonProps extends PropsWithChildren {
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: any;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default function Button({ type, className, disabled, loading, onClick, children, ...props }: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled && loading}
            onClick={onClick}
            className={twMerge(
                loading && 'cursor-not-allowed',
                'whitespace-nowrap',
                'font-btn',
                'shadow-md',
                'flex',
                'justify-center',
                'items-center',
                'px-4 h-10 w-[140px]',
                'rounded-btn',
                'bg-accent-soft text-inverse',
                'focus:outline-none focus:bg-accent',
                'md:hover:bg-accent transition',
                className
            )}
            {...props}
        >
            {loading ? (
                <Center>
                    <LoadingDots />
                </Center>
            ) : (
                children
            )}
        </button>
    );
}
