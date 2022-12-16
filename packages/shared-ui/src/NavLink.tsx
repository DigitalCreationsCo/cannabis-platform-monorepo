import cx from "clsx";
import Link from "next/link";
import React, { AnchorHTMLAttributes, CSSProperties, PropsWithChildren, SVGAttributes } from "react";
import { IconWrapper, Span } from ".";

// THIS CMP NEEDS A UNIT TEST, and simplification

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  isActive: boolean;
  style?: CSSProperties;
  Icon: SVGElement
}

const NavLink = ({ href, Icon, isActive, children, style, className, ...props }: NavLinkProps) => {
  const navLinkStyle = ['flex space-x-2 p-2 items-center hover:bg-secondary border-l-4', isActive && 'border-secondary']
  return (
    <Link href={ href }>
      <div className={ cx(navLinkStyle) }>
      <IconWrapper Icon={Icon} />
      <StyledLink isActive={ isActive } { ...props }>
          { children }
        </StyledLink>
      </div>
    </Link>
  );
};

const StyledLink = ({ isActive, className, children }: {isActive: boolean, className?: string} & PropsWithChildren) => {
    return(
        <Span className={cx('whitespace-nowrap', className)}>{children}</Span>
    )
}

export default NavLink;
