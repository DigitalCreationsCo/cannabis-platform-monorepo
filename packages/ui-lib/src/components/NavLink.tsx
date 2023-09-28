import Link from 'next/link';
import { type AnchorHTMLAttributes, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import IconWrapper from './IconWrapper';
import { Paragraph } from './Typography';
export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	className?: string;
	isActive?: boolean;
	Icon: any;
}

const NavLink = ({
	href,
	Icon,
	isActive,
	children,
	className,
}: NavLinkProps) => {
	const navLinkStyle = [
		'h-[44px] flex space-x-2 p-4 items-center border-l-4 border-transparent hover:border-primary',
		isActive ? 'border-primary' : 'border-transparent',
	];
	return (
		<Link href={href}>
			<li className={twMerge(navLinkStyle, className)}>
				<IconWrapper Icon={Icon} />
				<StyledLink isActive={!!isActive}>{children}</StyledLink>
			</li>
		</Link>
	);
};

const StyledLink = ({
	// isActive,
	className,
	children,
}: { isActive: boolean; className?: string } & PropsWithChildren) => {
	return (
		<Paragraph className={twMerge('whitespace-nowrap', className)}>
			{children}
		</Paragraph>
	);
};

export default NavLink;
