import { Drawer, styled } from "@mui/material";
import clsx from "clsx";
import React, { PropsWithChildren, useEffect, useState } from "react";

export interface SideNavProps {
  position?: "left" | "right";
  open?: boolean;
  width?: number;
  handle: React.ReactElement;
  toggleSideNav?: () => void;
}

function SideNav({ position, open, width, handle, toggleSideNav, children }:SideNavProps & PropsWithChildren){
  const [sideNavOpen, setSideNavOpen] = useState(open);
  const handleToggleSideNav = () => setSideNavOpen(!sidenavOpen);

  useEffect(() => {
    setSideNavOpen(open);
  }, [open]);

    return (
      <div>SideNav</div>
    // <Wrapper>
    //   <Drawer
    //     anchor={position}
    //     open={sideNavOpen}
    //     onClose={toggleSideNav || handleToggleSideNav}
    //     SlideProps={{ style: { width: width || 280 } }}
    //   >
    //     {children}
    //   </Drawer>

    //   {handle &&
    //     cloneElement(handle, {
    //       className: clsx(handle.props?.className, "cursor-pointer"),
    //       onClick: toggleSideNav || handleToggleSideNav,
    //     })}
    // </Wrapper>
  );
};

SideNav.defaultProps = {
  width: 280,
  open: false,
  position: "left",
};

export default SideNav;
