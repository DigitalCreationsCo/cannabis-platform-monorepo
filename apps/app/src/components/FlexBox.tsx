import cx from "clsx";
import { PropsWithChildren } from "react";

const FlexBox = ({ children, className, wrap }: { className?: string; wrap?: boolean; } & PropsWithChildren) => (
  <div className={cx("align-center justify-center flex border border-black", className, wrap ? 'flex-wrap' : 'flex-nowrap' )} >
    {children}
  </div>
);

export default FlexBox;
