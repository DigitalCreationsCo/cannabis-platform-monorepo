import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export interface MenuItem {
	name: string;
	href: string;
	icon?: any;
	active?: boolean;
	items?: Omit<MenuItem, 'icon' | 'items'>[];
	className?: string;
}

export interface NavigationProps {
	activePathname: string | null;
}

interface NavigationItemsProps {
	menus: MenuItem[];
	isExpanded?: boolean;
}

interface NavigationItemProps {
	menu: MenuItem;
	className?: string;
	isExpanded?: boolean;
}

const NavigationItems = ({
	menus,
	isExpanded = true,
}: NavigationItemsProps) => {
	return (
		// eslint-disable-next-line jsx-a11y/no-redundant-roles
		<ul role="list" className="flex flex-1 flex-col gap-1">
			{menus.map((menu) => (
				<li key={menu.name}>
					<NavigationItem isExpanded={isExpanded} menu={menu} />
					{menu.items && (
						<ul className="flex flex-col gap-1 mt-1">
							{menu.items.map((subitem) => (
								<li key={subitem.name}>
									<NavigationItem
										menu={subitem}
										isExpanded={isExpanded}
										className=""
									/>
								</li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	);
};

const NavigationItem = ({
	menu,
	isExpanded = true,
	className,
}: NavigationItemProps) => {
	return (
		<Link
			href={menu.href}
			className={twMerge(
				`group transition flex items-center rounded text-gray-900 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800 p-2 gap-2 font-medium ${
					menu.active ? ' bg-gray-200 font-semibold pl-9' : ''
				}${className}`
			)}
		>
			{menu.icon && (
				<menu.icon
					className={twMerge([
						'transition-transform duration-1000 ease-in-out',
						isExpanded ? '' : 'translate-x-2',
						'h-8 w-8 shrink-0 group-hover:text-gray-900 dark:group-hover:text-gray-100',
					])}
					aria-hidden="true"
				/>
			)}
			<span
				className={twMerge([
					'whitespace-nowrap transition-[opacity] duration-300 ease-in-out', // Transition for the title
					isExpanded ? 'opacity-100' : 'opacity-0', // Fade in/out
				])}
			>
				{menu.name}
			</span>
		</Link>
	);
};

export default NavigationItems;
