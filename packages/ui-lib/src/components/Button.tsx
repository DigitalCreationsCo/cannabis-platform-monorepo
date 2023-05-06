import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Center from './Center';
import LoadingDots from './LoadingDots';

export interface ButtonProps extends PropsWithChildren {
    size?: 'lg' | 'sm' | 'md';
    bg?: 'primary' | 'primary-light' | 'accent-soft' | 'transparent';
    hover?: 'accent' | 'primary' | 'primary-light' | 'secondary' | 'transparent';
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
        button: [
            'rounded-btn',
            'whitespace-nowrap',
            'font-btn',
            'shadow-md',
            'flex items-center place-self-center',
            'justify-center'
        ],
        noClickWhileLoading: loading && 'cursor-not-allowed',
        size: [
            (size === 'lg' && 'text-xl min-w-[180px] h-[70px]') || (size === 'sm' && 'text-sm h-[30px]') || 'w-[140px] h-10'
        ],
        bgColor: ['bg-' + bg],
        textColor: [
            !disabled ? [(bg === 'transparent' && 'text-dark shadow-none') || (bg === 'accent-soft' && 'text-dark') || 'text-light'] : 'text-secondary'
        ],
        focus: ['focus:outline-none focus:bg-' + bg],
        hover: [!disabled ? hover && ['hover:bg-' + hover, 'transition ease-in-out duration-300'] : ''],
        transparent: (transparent && 'opacity-90') || '',
        border: [border ? 'border-' + hover : 'border-transparent']
    };
    return (
        <button
            type={type}
            disabled={loading || disabled}
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
