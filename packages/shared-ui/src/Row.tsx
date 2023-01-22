import React, { PropsWithChildren } from 'react';
import { Card } from '.';
import { twMerge } from 'tailwind-merge';

function Row({ className, children }: { className?: string } & PropsWithChildren) {
    return <Card className={twMerge('flex flex-row justify-between items-center', className)}>{children}</Card>;
}

export default Row;
