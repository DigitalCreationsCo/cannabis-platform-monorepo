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
		<ul role="list" className="flex flex-1 flex-col">
			{menus.map((menu) => (
				<li key={menu.name}>
					<NavigationItem isExpanded={isExpanded} menu={menu} />
					{menu.items && (
						<ul className="flex flex-col">
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
				`text-sm group transition flex text-gray-900 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800 font-medium ${
					menu.active ? ' bg-gray-200 font-semibold pl-9' : ''
				}${className}`
			)}
		>
			<div
				className={twMerge(
					'hover:scale-102',
					'transition',
					'flex',
					'w-full h-full',
					'justify-between',
					'p-2 gap-2',
					'items-center'
				)}
			>
				{menu.icon && (
					<menu.icon
						className={twMerge([
							'transition ease-in-out',
							'translate-x-2',
							// isExpanded ? '' : 'translate-x-2',
							// 'items-center mx-auto',
							'h-8 w-8 shrink-0 group-hover:text-gray-900 dark:group-hover:text-gray-100',
						])}
						aria-hidden="true"
					/>
				)}
				<span
					className={twMerge([
						'whitespace-nowrap transition-[opacity] duration-300 ease-in-out text-md', // Transition for the title
						isExpanded ? 'opacity-100' : 'opacity-0', // Fade in/out
					])}
				>
					{menu.name}
				</span>
			</div>
		</Link>
	);
};

export default NavigationItems;
