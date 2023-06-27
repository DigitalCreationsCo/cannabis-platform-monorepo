import { PropsWithChildren } from 'react';
import IconWrapper, { IconProps } from '../IconWrapper';
import Button, { ButtonProps } from './Button';
export interface IconButtonProps extends ButtonProps, IconProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    className?: string;
    iconClass?: string;
    iconSize?: number;
    theme?: 'light' | 'dark';
}
export default function IconButton({
    Icon,
    type = 'button',
    onClick,
    className,
    iconClass,
    iconSize = 20,
    children,
    theme = 'light',
    ...props
}: IconButtonProps & PropsWithChildren) {
    return (
        <Button 
        type={type} 
        onClick={onClick} 
        className={className} 
        {...props}>
            <IconWrapper 
            theme={theme} 
            iconSize={iconSize} 
            className={iconClass}
            Icon={Icon} 
            />
            {children}
        </Button>
    );
}
