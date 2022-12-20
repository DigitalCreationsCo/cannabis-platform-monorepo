import { Drawer, styled } from "@mui/material";
import clsx from "clsx";
import React, { cloneElement, FC, PropsWithChildren, useEffect, useState } from "react";

export interface SideNavProps {
  position?: "left" | "right";
  open?: boolean;
  width?: number;
  handle: React.ReactElement;
  toggleSideNav?: () => void;
}

const Wrapper = styled("div")(() => ({
  "& .handle": { cursor: "pointer" },
}));

function SideNav({ position, open, width, handle, toggleSideNav, children }:SideNavProps & PropsWithChildren){
  const [sideNavOpen, setSideNavOpen] = useState(open);
  const handleToggleSideNav = () => setSideNavOpen(!sidenavOpen);

  useEffect(() => {
    setSideNavOpen(open);
  }, [open]);

  return (
    <Wrapper>
      <Drawer
        anchor={position}
        open={sideNavOpen}
        onClose={toggleSideNav || handleToggleSideNav}
        SlideProps={{ style: { width: width || 280 } }}
      >
        {children}
      </Drawer>

      {handle &&
        cloneElement(handle, {
          className: clsx(handle.props?.className, "handle"),
          onClick: toggleSideNav || handleToggleSideNav,
        })}
    </Wrapper>
  );
};

SideNav.defaultProps = {
  width: 280,
  open: false,
  position: "left",
};

export default SideNav;
