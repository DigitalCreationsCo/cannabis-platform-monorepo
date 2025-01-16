/* eslint-disable jsx-a11y/no-redundant-roles */
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface BaseMenuItem {
	name: string;
	icon?: any;
	active?: boolean;
	items?: Omit<MenuItem, 'icon' | 'items'>[];
	className?: string;
}

export type MenuItem<B = BaseMenuItem> = B & {
	href: string;
	onClick?: never;
} extends B
	? B & {
			href: string;
			onClick?: never;
		}
	: B & { onClick: () => void; href?: never };

export interface NavigationProps {
	activePathname: string | null;
}

interface NavigationItemsProps {
	menus: MenuItem<BaseMenuItem>[];
}

interface NavigationItemProps {
	menu: MenuItem<BaseMenuItem>;
	className?: string;
}

const NavigationItems = ({ menus }: NavigationItemsProps) => {
	return (
		<ul role="list" className="flex flex-1 flex-col gap-1">
			{menus.map((menu) => (
				<li key={menu.name}>
					<NavigationItem menu={menu} />
					{menu.items && (
						<ul className="flex flex-col gap-1 mt-1">
							{menu.items.map((subitem) => (
								<li key={subitem.name}>
									<NavigationItem menu={subitem} className="pl-9" />
								</li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	);
};

const NavigationItem = ({ menu, className }: NavigationItemProps) => {
	return (
		<>
			{menu.href && (
				<Link
					href={menu.href}
					className={`group flex items-center rounded text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800 p-2 gap-2${
						menu.active ? 'text-white bg-gray-800 font-semibold' : ''
					}${className}`}
				>
					{menu.icon && (
						<menu.icon
							className={twMerge([
								'h-5 w-5 shrink-0 group-hover:text-gray-900 dark:group-hover:text-gray-100',
								menu.active ? 'text-gray-100' : '',
							])}
							aria-hidden="true"
						/>
					)}
					{menu.name}
				</Link>
			)}
			{!menu.href && (
				<button
					onClick={menu.onClick}
					className={`group flex w-full items-center rounded text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800 p-2 gap-2${
						menu.active ? 'text-white bg-gray-800 font-semibold' : ''
					}${className}`}
				>
					{menu.icon && (
						<menu.icon
							className={twMerge([
								'h-5 w-5 shrink-0 group-hover:text-gray-900 dark:group-hover:text-gray-100',
								menu.active ? 'text-gray-100' : '',
							])}
							aria-hidden="true"
						/>
					)}
					{menu.name}
				</button>
			)}
		</>
	);
};

export default NavigationItems;
