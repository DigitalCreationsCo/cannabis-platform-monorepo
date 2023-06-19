import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

function Row({ className, children }: { className?: string } & PropsWithChildren) {
    return (
        <div className={twMerge('flex flex-row justify-between items-center space-x-4', className)}>{children}</div>
    );
}

export default Row;
