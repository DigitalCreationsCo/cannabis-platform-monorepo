import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const FlexBox = ({ children, className, wrap }: { className?: string; wrap?: boolean } & PropsWithChildren) => (
    <div
        className={twMerge(
            'flex space-x-4 items-center',
            className,
            wrap ? 'flex-wrap' : 'flex-nowrap whitespace-nowrap'
        )}
    >
        {children}
    </div>
);

export default FlexBox;
