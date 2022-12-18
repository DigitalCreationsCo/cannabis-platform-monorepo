import React, { PropsWithChildren } from "react";
import cx from 'clsx'

type GridProps = {
    className?: string;
    cols?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}
function Grid({ className, cols, sm, md, lg, xl, children }: GridProps & PropsWithChildren) {
    return (
        <div className={ cx(`grid gap-4 grid-flow-col auto-cols-max`, sm && `sm:grid-cols-${sm}`, md && `md:grid-cols-${md}`, lg && `lg:grid-cols-${lg}`, xl && `xl:grid-cols-${xl}`, className) }>
            {/* { 'sm:' + sm }{'cols:' + cols}{undefined ? 'true' : 'false'}{'md:' + md} */}
            {children}
        </div>
    );
}

export default Grid;