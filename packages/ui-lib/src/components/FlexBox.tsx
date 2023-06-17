import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const FlexBox = ({ children, className, ...props }: { className?: string } & PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => (
    <div className={twMerge('flex flex-col', 'items-start', className)} { ...props }>{children}</div>
);

export default FlexBox;
