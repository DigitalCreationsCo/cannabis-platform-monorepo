import React, { ReactEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import { Icons, IconButton } from ".";

type DeleteButtonProps = {
    className?: string;
    size?: number;
    onClick: ReactEventHandler;
}
export default function DeleteButton({ className, onClick, size = 12 }: DeleteButtonProps) {
    return (
        <IconButton
            Icon={ Icons.XIcon }
            className={ twMerge("min-w-[50px] md:w-[120px] text-primary sm:space-x-2 h-full", className) }
            size={size}
            type="button"
            onClick={ onClick }
        >
            <div className="hidden md:block">Delete</div>
        </IconButton>
    );
}
