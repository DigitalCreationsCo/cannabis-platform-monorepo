import Link from 'next/link';
import { type AnchorHTMLAttributes, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import IconWrapper from './IconWrapper';
import { Paragraph } from './Typography';

export type NavLinkType = {
	href: string;
	title: string;
	icon: any;
	enabled: boolean;
	subLinks?: NavLinkType[];
};

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	link: NavLinkType;
	isActive?: boolean;
}

const NavLink = ({ link, isActive, children, className }: NavLinkProps) => {
	// isActive prop value is not working with dynamic path

	const navLinkStyle = [
		'h-[44px] flex space-x-2 p-4 items-center border-l-4 hover:border-primary',
		isActive ? 'border-primary' : 'border-transparent',
	];

	const renderSubLinks = () => (
		<ul>
			{link.subLinks?.map((subLink, i) => (
				<Link key={`nav-sublink- ${i}`} href={subLink.href}>
					<li className={twMerge(navLinkStyle, className)}>
						<IconWrapper Icon={subLink.icon} />
						<StyledLink isActive={!!isActive}>{subLink.title}</StyledLink>
					</li>
				</Link>
			))}
		</ul>
	);
	return (
		<>
			<Link href={link.href}>
				<li className={twMerge(navLinkStyle, className)}>
					<IconWrapper Icon={link.icon} />
					<StyledLink isActive={!!isActive}>{children}</StyledLink>
				</li>
			</Link>
			{renderSubLinks()}
		</>
	);
};

const StyledLink = ({
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
