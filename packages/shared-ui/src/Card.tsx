import { H4, H6 } from "./index"
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = { className?: string; title?: string; amount?: string | number; }

function Card({ className, title, amount, children }: CardProps & PropsWithChildren) {
    return (
        <div className={ twMerge("flex flex-col shadow rounded-btn min-w-max py-2 sm:px-4 sm:space-x-4", className)}>
            { title && <H6>{ title }</H6> }
            { amount !== undefined && <H4>{ amount }</H4> }
            { children }
        </div>
    );
}

export default Card;