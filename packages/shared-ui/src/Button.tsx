import cx from 'clsx';
import { PropsWithChildren } from 'react';
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
            className={cx(
                {
                    'cursor-not-allowed': loading,
                },

                'whitespace-nowrap',
                'relative',
                'font-semibold',
                'group',
                'shadow-md',
                'flex',
                'inline-flex',
                'justify-center',
                'items-center',
                'space-x-5',
                'w-full',
                'px-4',
                'h-10',
                'my-2',
                'rounded-btn',
                'focus:outline-none',
                className
            )}
            {...props}
        >
            {loading ? <LoadingDots /> : children}
        </button>
    );
}
