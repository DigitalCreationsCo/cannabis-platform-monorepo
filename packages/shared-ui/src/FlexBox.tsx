import cx from "clsx";
import React, { PropsWithChildren } from "react";

const FlexBox = ({ children, className, wrap }: { className?: string; wrap?: boolean; } & PropsWithChildren) => (
  <div className={cx("flex grow", className, wrap ? 'flex-wrap' : 'flex-nowrap' )} >
    {children}
  </div>
);

export default FlexBox;
