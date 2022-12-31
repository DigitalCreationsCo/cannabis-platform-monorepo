import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { H6 } from ".";

type GridProps = {
    title?: string;
    className?: string;
    cols?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    gap?: string;
}
function Grid({ gap, title, className, cols, sm, md, lg, xl, children }: GridProps & PropsWithChildren) {
    return (
        <div className="container py-2">
            { title && <H6 className="py-2">{ title }</H6>}
            <div className={ twMerge('grid', cols && `grid-cols-${cols}`, sm && `sm:grid-cols-${sm}`, md && `md:grid-cols-${md}`, lg && `lg:grid-cols-${lg}`, xl && `xl:grid-cols-${xl}`, gap && "gap-" + gap, className) }>
            {children}
            </div>
        </div>
    );
}

export default Grid;