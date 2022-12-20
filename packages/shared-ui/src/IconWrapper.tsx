import React from "react";
import { twMerge } from "tailwind-merge";

type IconProps = {
    Icon: any;
    className?: string;
    size?: number;
}

export default function IconWrapper({ Icon, className, size = 20 }: IconProps) {
    return (
        <Icon className={twMerge('align-items', className)} height={ size } width={ size } />
    );
}