import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { AnchorHTMLAttributes, CSSProperties } from "react";

// component props interface
export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  style?: CSSProperties;
}
// styled component
// const StyledLink = styled("a")<{ active_route?: string }>(({ theme, active_route }) => ({
//   position: "relative",
//   transition: "color 150ms ease-in-out",
//   color: active_route === "active" ? theme.palette.primary.main : "inherit",
//   "&:hover": { color: `${theme.palette.primary.main} !important` },
// }));

const NavLink = ({ href, children, style, className, ...props }: NavLinkProps) => {
  const { pathname } = useRouter();

  const checkRouteMatch = () => {
    if (href === "/") return pathname === href;
    return pathname.includes(href);
  };
  // active route
  const currentRoute = checkRouteMatch();

  return (
    // <Link href={href}>
    //   <StyledLink
    //     href={href}
    //     style={style}
    //     className={clsx(className)}
    //     active_route={currentRoute ? "active" : ""}
    //     {...props}
    //   >
    //     {children}
    //   </StyledLink>
    // </Link>
    <div>{ children }</div>
  );
};

export default NavLink;
