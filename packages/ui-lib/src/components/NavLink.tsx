import Link from 'next/link';
import { type AnchorHTMLAttributes, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import IconWrapper from './IconWrapper';

export interface NavLinkType {
	href: string;
	title: string;
	icon?: any;
	enabled: boolean;
	subLinks?: NavLinkType[];
}

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	link: NavLinkType;
	isActive?: boolean;
}

const NavLink = ({ link, isActive, children, className }: NavLinkProps) => {
	// isActive prop value is not working with dynamic path

	const navLinkStyle = [
		'whitespace-nowrap capitalize hover:text-primary font-semibold h-[49px] flex space-x-2 p-4 items-center border-l-4 hover:border-primary',
		isActive ? 'border-primary' : 'border-transparent',
	];

	const renderSubLinks = () =>
		link.subLinks && link.subLinks.length > 0 ? (
			<ul>
				{link.subLinks.map((subLink, i) => (
					<StyledLink
						className={twMerge(navLinkStyle, className)}
						key={`nav-sublink- ${i}`}
						href={subLink.href}
						isActive={!!isActive}
					>
						<IconWrapper Icon={subLink.icon} />
						{subLink.title}
					</StyledLink>
				))}
			</ul>
		) : (
			<></>
		);

	return (
		<>
			<li>
				<StyledLink
					href={link.href}
					className={twMerge(navLinkStyle, className)}
					isActive={!!isActive}
				>
					{(link.icon && <IconWrapper className="pr-2" Icon={link.icon} />) || (
						<></>
					)}
					{children}
				</StyledLink>
				{renderSubLinks()}
			</li>
		</>
	);
};

const StyledLink = ({
	href,
	className,
	children,
}: {
	href: string;
	isActive: boolean;
	className?: string;
} & PropsWithChildren) => {
	return (
		<Link href={href} className={twMerge(className)}>
			{children}
		</Link>
	);
};

export default NavLink;
