import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
interface Props extends PropsWithChildren {
    color?: 'light' | 'dark';
    className?: string;
}

export const H1 = ({ className, color = 'dark', children }: Props) => {
    return (
        <h1
            className={twMerge(
                'text-4xl font-bold whitespace-nowrap',
                (color === 'light' && 'text-inverse') || 'text-dark',
                className
            )}
        >
            {children}
        </h1>
    );
};

export const H2 = ({ className, color = 'dark', children }: Props) => {
    return (
        <h2
            className={twMerge(
                'font-bold text-3xl whitespace-nowrap',
                (color === 'light' && 'text-inverse') || 'text-dark',
                className
            )}
        >
            {children}
        </h2>
    );
};

export const H3 = ({ className, color = 'dark', children }: Props) => {
    return (
        <h3
            className={twMerge(
                'font-bold text-2xl whitespace-normal',
                (color === 'light' && 'text-inverse') || 'text-dark',
                className
            )}
        >
            {children}
        </h3>
    );
};

export const H4 = ({ className, color = 'dark', children }: Props) => {
    return (
        <h4
            className={twMerge(
                'font-semibold text-xl whitespace-normal',
                (color === 'light' && 'text-inverse') || 'text-dark',
                className
            )}
        >
            {children}
        </h4>
    );
};

export const H5 = ({ className, color = 'dark', children }: Props) => {
    return (
        <h5
            className={twMerge(
                'font-semibold text-lg whitespace-normal',
                (color === 'light' && 'text-inverse') || 'text-dark',
                className
            )}
        >
            {children}
        </h5>
    );
};

export const H6 = ({ className, color = 'dark', children }: Props) => {
    return (
        <h6
            className={twMerge(
                'font-semibold text-md whitespace-normal',
                (color === 'light' && 'text-inverse') || 'text-dark',
                className
            )}
        >
            {children}
        </h6>
    );
};

export const Paragraph = ({ className, color = 'dark', children }: Props) => {
    return (
        <p className={twMerge('whitespace-pre-line', (color === 'light' && 'text-inverse') || 'text-dark', className)}>
            {children}
        </p>
    );
};

export const Small = ({ className, children }: Props) => {
    return <span className={twMerge('text-sm whitespace-normal', className)}>{children}</span>;
};

export const Span = ({ className, children }: Props) => {
    return <span className={twMerge('text-md inline whitespace-normal', className)}>{children}</span>;
};

export const Tiny = ({ className, children }: Props) => {
    return <span className={twMerge('text-xs whitespace-normal', className)}>{children}</span>;
};
