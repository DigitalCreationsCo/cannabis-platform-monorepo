import cx from "clsx";
import React, { PropsWithChildren } from "react";

const FlexBox = ({ children, className, wrap }: { className?: string; wrap?: boolean; } & PropsWithChildren) => (
  <div className={cx("flex space-x-2 items-center", className, wrap ? 'flex-wrap' : 'flex-nowrap' )} >
    {children}
  </div>
);

export default FlexBox;
