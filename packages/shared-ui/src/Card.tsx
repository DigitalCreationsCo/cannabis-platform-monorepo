import { H4, H6 } from "./index"
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = { className?: string; title?: string; amount?: string | number; }

function Card({ className, title, amount, children }: CardProps & PropsWithChildren) {
    return (
        <div className={ twMerge("shadow rounded-btn min-w-max p-4", className)}>
            <H6>{ title }</H6>
            <H4>{ amount }</H4>
            { children }
        </div>
    );
}

export default Card;