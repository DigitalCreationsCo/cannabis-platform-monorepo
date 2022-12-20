import React, { PropsWithChildren, ReactEventHandler } from "react";
import {IconWrapper, Button} from ".";

type IconButtonProps = {
    Icon: any;
    type?: "button" | "submit" | "reset";
    onClick: ReactEventHandler;
    className?: string;
    size?: number;
};
export default function IconButton({ Icon, type, onClick, className, size = 20, children, ...props }: IconButtonProps & PropsWithChildren) {
    return (
        <Button type={ type }  onClick={onClick} className={className} { ...props } >
            <IconWrapper height={ size } width={ size } Icon={ Icon } />
            {children}
        </Button>
    );
}