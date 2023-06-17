import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const FlexBox = ({ children, className }: { className?: string } & PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => (
    <div className={twMerge('flex flex-col', 'items-start', className)}>{children}</div>
);

export default FlexBox;
