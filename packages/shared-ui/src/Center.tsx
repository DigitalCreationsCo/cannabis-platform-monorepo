import React, { PropsWithChildren } from "react";
import FlexBox from "./FlexBox"
import { twMerge } from "tailwind-merge";

function Center({ className, children }: { className?: string; } & PropsWithChildren) {
    return (
        <FlexBox className={ twMerge("grow flex-col justify-center", className) }>
            {children}
        </FlexBox>
    );
}

export default Center;