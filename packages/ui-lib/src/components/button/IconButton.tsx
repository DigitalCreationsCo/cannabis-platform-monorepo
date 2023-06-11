import { PropsWithChildren } from 'react';
import IconWrapper, { IconProps } from '../IconWrapper';
import Button from './Button';
export interface IconButtonProps extends IconProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
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
    theme = 'light',
    ...props
}: IconButtonProps & PropsWithChildren) {
    return (
        <Button type={type} onClick={onClick} className={className} {...props}>
            <IconWrapper theme={theme} size={size} Icon={Icon} />
            {children}
        </Button>
    );
}
