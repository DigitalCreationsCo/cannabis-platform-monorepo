import React from "react";
import { twMerge } from "tailwind-merge";

type IconProps = {
    Icon: any;
    className?: string;
    height?: number;
    width?: number;
}

export default function IconWrapper({ Icon, className, height = 20, width = 20 }: IconProps) {
    return (
        <Icon className={twMerge('align-items', className)} height={ height } width={ width } />
    );
}