import { PropsWithChildren, ReactEventHandler } from 'react';
import Button from './Button';
import IconWrapper, { IconProps } from './IconWrapper';
export interface IconButtonProps extends IconProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: ReactEventHandler;
    className?: string;
    size?: number;
    theme?: 'light' | 'dark';
}
export default function IconButton({
    Icon,
    type,
    onClick,
    className,
    size = 20,
    children,
    theme = 'dark',
    ...props
}: IconButtonProps & PropsWithChildren) {
    return (
        <Button type={type} onClick={onClick} className={className} {...props}>
            <IconWrapper theme={theme} size={size} Icon={Icon} />
            {children}
        </Button>
    );
}
