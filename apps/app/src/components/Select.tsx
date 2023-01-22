import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectProps = {
    // label?: string | number;
    options: any[];
    onClick?: any;
    // value: string | number;
    // defaultOption: any;
    className?: string;
    childrenFirst?: boolean;
    childrenLast?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement> &
    PropsWithChildren;
export default function Select({
    multiple,
    childrenFirst,
    childrenLast,
    options,
    onClick,
    // label,
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
                {children && childrenFirst && !childrenLast && children}
                {options.map((o) => (
                    <MenuItem
                        onClick={onClick}
                        onKeyUp={onClick}
                        key={'code-' + o.label}
                        label={o.label}
                        value={o.value}
                    ></MenuItem>
                ))}
                {children && childrenLast && children}
            </select>
        </div>
    );
}

type MenuItemProps = {
    label?: string;
    value: string;
} & PropsWithChildren;
export function MenuItem({ label, value, children }: MenuItemProps) {
    return (
        <option>
            {label} {value} {children}
        </option>
    );
}
