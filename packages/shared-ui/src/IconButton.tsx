import React, { PropsWithChildren, ReactEventHandler } from "react";
import {IconWrapper, Button} from ".";

type IconButtonProps = {
    Icon: any;
    onClick: ReactEventHandler;
    className?: string;
    height?: number;
    width?: number;
};
export default function IconButton({ Icon, onClick, className, height = 20, width = 20, children, ...rest }: IconButtonProps & PropsWithChildren) {
    return (
        <Button onClick={onClick} className={className}>
            <IconWrapper height={ height } width={ width } { ...rest } Icon={ Icon } />
            {children}
        </Button>
    );
}