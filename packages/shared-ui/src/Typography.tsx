import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
interface Props extends PropsWithChildren {
    className?: string;
}

export const H1 = ({ className, children }: Props) => {
    return <h1 className={twMerge('text-4xl font-bold whitespace-nowrap', className)}>{children}</h1>;
};

export const H2 = ({ className, children }: Props) => {
    return <h2 className={twMerge('font-bold text-3xl whitespace-nowrap', className)}>{children}</h2>;
};

export const H3 = ({ className, children }: Props) => {
    return <h3 className={twMerge('font-bold text-2xl whitespace-nowrap', className)}>{children}</h3>;
};

export const H4 = ({ className, children }: Props) => {
    return <h4 className={twMerge('font-semibold text-xl whitespace-nowrap', className)}>{children}</h4>;
};

export const H5 = ({ className, children }: Props) => {
    return <h5 className={twMerge('font-semibold text-lg whitespace-nowrap', className)}>{children}</h5>;
};

export const H6 = ({ className, children }: Props) => {
    return <h6 className={twMerge('font-semibold text-md whitespace-nowrap', className)}>{children}</h6>;
};

export const Paragraph = ({ className, children }: Props) => {
    return <p className={twMerge('whitespace-normal', className)}>{children}</p>;
};

export const Small = ({ className, children }: Props) => {
    return <span className={twMerge('text-sm whitespace-nowrap', className)}>{children}</span>;
};

export const Span = ({ className, children }: Props) => {
    return <span className={twMerge('text-md inline whitespace-nowrap', className)}>{children}</span>;
};

export const Tiny = ({ className, children }: Props) => {
    return <span className={twMerge('text-xs whitespace-nowrap', className)}>{children}</span>;
};
