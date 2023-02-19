import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Center from './Center';
import LoadingDots from './LoadingDots';

interface ButtonProps extends PropsWithChildren {
    size?: 'lg' | 'sm' | 'md';
    bg?: 'primary' | 'accent-soft' | 'transparent';
    hover?: 'accent' | 'primary';
    transparent?: true | false;
    border?: boolean;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: any;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default function Button({
    size = 'md',
    bg = 'accent-soft',
    border = false,
    hover = 'accent',
    transparent = false,
    type,
    className,
    disabled,
    loading,
    onClick,
    children,
    ...props
}: ButtonProps) {
    const classes = {
        button: ['rounded-btn', 'whitespace-nowrap', 'font-btn', 'shadow-md', 'flex items-center', 'justify-center'],
        noClickWhileLoading: loading && 'cursor-not-allowed',
        size: [
            (size === 'lg' && 'text-xl w-[200px] h-[80px]') || (size === 'sm' && 'text-sm h-[30px]') || 'w-[140px] h-10'
        ],
        bgColor: ['bg-' + bg],
        textColor: [
            (bg === 'transparent' && 'text-dark shadow-none') || (bg === 'accent-soft' && 'text-dark') || 'text-light'
        ],
        focus: ['focus:outline-none focus:bg-' + bg],
        hover: [hover && 'hover:bg-' + hover, 'transition ease-in-out duration-300'],
        transparent: (transparent && 'opacity-90') || '',
        border: [border ? 'border-' + hover : 'border-transparent']
    };
    return (
        <button
            type={type}
            disabled={disabled && loading}
            onClick={onClick}
            className={twMerge(Object.values(classes), className)}
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
