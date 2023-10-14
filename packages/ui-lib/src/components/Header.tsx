import {
	type ChangeEventHandler,
	type PropsWithChildren,
	type ReactEventHandler,
} from 'react';
import { twMerge } from 'tailwind-merge';
import Icons from '../icons';
import IconWrapper from './IconWrapper';
import SearchField from './SearchField';

type HeaderProps = {
	onSearchChange?: ChangeEventHandler<HTMLInputElement> &
		ReactEventHandler<Element>;
	placeholder?: string;
	drawerComponentId?: string;
	showDrawer?: boolean;
	showSearch?: boolean;
} & PropsWithChildren;
function Header({
	onSearchChange,
	placeholder,
	drawerComponentId,
	showDrawer = true,
	showSearch = true,
	children,
}: HeaderProps) {
	const headerContainerStyle = [
		'flex flex-row',
		'lg:px-16 xl:pl-0 xl:pr-16',
		'lg:justify-end lg:right-0',
	];
	const headerStyle = [
		'lg:pl-[188px]',
		'flex flex-row grow',
		'w-full md:w-fit xl:w-fit',
		'lg:justify-end lg:h-fit',
		'lg:pt-2',
		'shadow-md lg:shadow-none',
	];
	return (
		<div className={twMerge(headerContainerStyle)}>
			<div className={twMerge(headerStyle)}>
				{(showDrawer && (
					<CategoriesMenu drawerComponentId={drawerComponentId} />
				)) || <></>}
				{(showSearch && (
					<SearchField placeholder={placeholder} onChange={onSearchChange} />
				)) || <></>}
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
	<label htmlFor={drawerComponentId} className={twMerge(drawerButtonStyle)}>
		<IconWrapper
			Icon={Icons.OpenPanelLeft}
			iconSize={28}
			className="text-inverse"
		/>
	</label>
);

const drawerButtonStyle = ['btn btn-ghost rounded-none lg:hidden'];

export default Header;
