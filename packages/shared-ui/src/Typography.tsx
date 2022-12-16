import { twMerge } from 'tailwind-merge';
import { PropsWithChildren } from 'react';
interface Props extends PropsWithChildren {
    className?: string;
}

export const H1 = ({ className, children }: Props) => {
    return <h1 className={twMerge('text-default', 'text-4xl font-bold tracking-normal whitespace-nowrap', className)}>{children}</h1>;
};

export const H2 = ({ className, children }: Props) => {
    return <h2 className={twMerge('text-default font-bold text-3xl tracking-normal whitespace-nowrap', className)}>{children}</h2>;
};

export const H3 = ({ className, children }: Props) => {
    return <h3 className={twMerge('text-default font-bold text-2xl tracking-normal whitespace-nowrap', className)}>{children}</h3>;
};

export const H4 = ({ className, children }: Props) => {
    return <h4 className={twMerge('text-default font-bold text-xl tracking-normal whitespace-nowrap', className)}>{children}</h4>;
};

export const H5 = ({ className, children }: Props) => {
    return <h5 className={twMerge('text-default font-bold text-lg tracking-normal whitespace-nowrap', className)}>{children}</h5>;
};

export const H6 = ({ className, children }: Props) => {
    return <h6 className={twMerge('text-default font-bold text-md tracking-normal whitespace-nowrap', className)}>{children}</h6>;
};

export const Paragraph = ({ className, children }: Props) => {
    return <p className={twMerge('text-default text-md font-medium tracking-normal whitespace-nowrap', className)}>{children}</p>;
};

export const Small = ({ className, children }: Props) => {
    return <span className={twMerge('text-default text-sm tracking-normal whitespace-nowrap', className)}>{children}</span>;
};

export const Span = ({ className, children }: Props) => {
    return <span className={twMerge('text-default text-md inline tracking-normal whitespace-nowrap', className)}>{children}</span>;
};

export const Tiny = ({ className, children }: Props) => {
    return <span className={twMerge('text-default text-xs tracking-normal whitespace-nowrap', className)}>{children}</span>;
};
