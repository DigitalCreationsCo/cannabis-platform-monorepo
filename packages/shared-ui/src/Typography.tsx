import cx from 'clsx';
import { PropsWithChildren } from 'react';
interface Props extends PropsWithChildren {
    className?: string | '';
}

export const H1 = ({ className, children }: Props) => {
    return <h1 className={cx('font-bold text-3xl', className)}>{children}</h1>;
};

export const H2 = ({ className, children }: Props) => {
    return <h2 className={cx('font-bold text-3xl', className)}>{children}</h2>;
};

export const H3 = ({ className, children }: Props) => {
    return <h3 className={cx('font-bold text-2xl', className)}>{children}</h3>;
};

export const H4 = ({ className, children }: Props) => {
    return <h4 className={cx('font-bold text-xl', className)}>{children}</h4>;
};

export const H5 = ({ className, children }: Props) => {
    return <h5 className={cx('font-bold text-lg', className)}>{children}</h5>;
};

export const H6 = ({ className, children }: Props) => {
    return <h6 className={cx('leading-6 font-bold text-md', className)}>{children}</h6>;
};

export const Paragraph = ({ className, children }: Props) => {
    return <p className={cx('text-md font-medium', className)}>{children}</p>;
};

export const Small = ({ className, children }: Props) => {
    return <span className={cx('text-sm', className)}>{children}</span>;
};

export const Span = ({ className, children }: Props) => {
    return <span className={cx('text-md inline', className)}>{children}</span>;
};

export const Tiny = ({ className, children }: Props) => {
    return <span className={cx('text-xs', className)}>{children}</span>;
};
