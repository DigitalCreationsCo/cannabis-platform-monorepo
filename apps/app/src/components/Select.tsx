import { Paragraph } from '@cd/shared-ui';
import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectProps = {
    // label?: string | number;
    // options: any[];
    // value: string | number;
    // defaultOption: any;
    className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement> &
    PropsWithChildren;
export default function Select({
    multiple,
    // label,
    // options,
    // value,
    // defaultOption = options[ 0 ],
    className,
    children,
}: SelectProps) {
    return (
        <div className="w-full">
            <select
                className={twMerge('focus:outline-none shadow border select w-full', className)}
                multiple={multiple}
            >
                {children}
            </select>
        </div>
    );
}

type MenuItemProps = {
    value: string;
} & PropsWithChildren;
export function MenuItem({ value, children }: MenuItemProps) {
    return <option>{children}</option>;
}
