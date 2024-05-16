import Link from 'next/link';
import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { TextContent } from '../../../core-lib/src';
import Icons from '../icons';
import { styles } from '../styleClassNames';
import { Button, IconButton } from './button';
import FlexBox from './FlexBox';
import IconWrapper from './IconWrapper';

type HeaderProps = {
	drawerComponentId?: string;
	showHeaderDrawer?: boolean;
} & PropsWithChildren;
function Header({
	drawerComponentId,
	showHeaderDrawer = true,
	children,
}: HeaderProps) {
	const container = [
		'h-12 max-h-12',
		'flex flex-row grow items-center',
		'bg-inherit',
		'space-x-4',
		'px-4 lg:px-12',
	];
	const header = [
		'flex flex-row grow',
		'lg:justify-end',
		'space-x-2',
		'justify-end',
	];
	return (
		<div className={twMerge(container, 'bg-transparent', 'text-inherit')}>
			<div className={twMerge(header)}>
				{/* {(showHeaderDrawer && (
					<CategoriesMenu drawerComponentId={drawerComponentId} />
				)) || <></>} */}
				<Link href={TextContent.href.browse}>
					<Button
						className={twMerge(
							styles.BUTTON.highlight,
							'hover:border-light',
							'text-light font-bold text-md',
						)}
						bg="transparent"
						hover="transparent"
						size="sm"
					>
						Find Dispensaries
					</Button>
				</Link>

				<Link href={TextContent.href.weedText}>
					<Button
						className={twMerge(
							styles.BUTTON.highlight,
							'hover:border-light',
							'text-light font-bold text-md',
						)}
						bg="transparent"
						hover="transparent"
						size="sm"
					>
						Get Delivery
					</Button>
				</Link>
			</div>
			{children}
		</div>
	);
}

const CategoriesMenu = ({
	drawerComponentId,
}: {
	drawerComponentId?: string;
}) => (
	<>
		<label
			htmlFor={drawerComponentId}
			className={twMerge(drawerButtonStyle, styles.BUTTON.highlight)}
		>
			<IconButton
				size="sm"
				hover="transparent"
				bg="transparent"
				Icon={Icons.MenuSimple}
				iconSize={28}
			></IconButton>
		</label>
	</>
);

const drawerButtonStyle = ['btn btn-ghost rounded-none lg:hidden'];

export default Header;
