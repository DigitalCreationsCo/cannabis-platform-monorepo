import { PropsWithChildren, ReactEventHandler } from 'react';
import Button from './Button';
import IconWrapper, { IconProps } from './IconWrapper';
export interface IconButtonProps extends IconProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: ReactEventHandler;
    className?: string;
    size?: number;
}
export default function IconButton({
    Icon,
    type,
    onClick,
    className,
    size = 20,
    children,
    ...props
}: IconButtonProps & PropsWithChildren) {
    return (
        <Button type={type} onClick={onClick} className={className} {...props}>
            <IconWrapper size={size} Icon={Icon} />
            {children}
        </Button>
    );
}
