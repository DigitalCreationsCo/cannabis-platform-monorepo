import { type AnchorHTMLAttributes, type PropsWithChildren } from 'react';
import { View, Text, IconWrapper } from '@components';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	isActive: boolean;
	Icon: any;
}

const NavLink = ({ Icon, isActive, children }: NavLinkProps) => {
	return (
		<View>
			<IconWrapper Icon={Icon} />
			<StyledLink isActive={isActive}>{children}</StyledLink>
		</View>
	);
};

const StyledLink = ({
	children,
}: { isActive: boolean; className?: string } & PropsWithChildren) => {
	return <Text>{children}</Text>;
};

export default NavLink;
