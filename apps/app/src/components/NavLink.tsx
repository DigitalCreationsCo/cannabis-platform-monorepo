import cx from "clsx";
import Link from "next/link";
import React, { AnchorHTMLAttributes, CSSProperties, PropsWithChildren } from "react";
import { Span } from "shared-ui";

// THIS CMP NEEDS A UNIT TEST

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  isActive: boolean;
  style?: CSSProperties;
}

const NavLink = ({ href, isActive, children, style, className, ...props }: NavLinkProps) => {
  const navLinkStyle = 'pr-1.5 mb-1.5 border-left-4 items-center justify-between { isActive ? border-yellow : transparent }'
  return (
    <div className={ cx(navLinkStyle) }>
      <Link href={href}>
        <StyledLink isActive={ isActive } {...props}>
          { children }
        </StyledLink>
      </Link>
    </div>
  );
};

const StyledLink = ({ isActive, children }: {isActive: boolean} & PropsWithChildren) => {
    return(
        <Span className={cx('whitespace-nowrap',isActive ? 'text-primary' : 'text-secondary', 'relative transition hover:text-primary')}>{children}</Span>
    )
}

export default NavLink;
