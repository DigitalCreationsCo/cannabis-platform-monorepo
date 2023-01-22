import React, { SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type IconProps = {
    Icon: (props: SVGAttributes<SVGElement>) => JSX.Element;
    className?: string;
    size?: number;
};
export default function IconWrapper({ Icon, className, size = 20, ...props }: IconProps) {
    return <Icon className={twMerge('align-items', className)} height={size} width={size} {...props} />;
}
