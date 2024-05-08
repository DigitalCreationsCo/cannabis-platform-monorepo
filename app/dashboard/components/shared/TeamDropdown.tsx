/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useDispensaries, maxLengthPolicies } from '@cd/core-lib';
import {
	ChevronUpDownIcon,
	FolderIcon,
	FolderPlusIcon,
	RectangleStackIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const TeamDropdown = () => {
	const router = useRouter();
	const { dispensaries } = useDispensaries();
	const { data } = useSession();
	const { t } = useTranslation('common');

	const user = data?.user as { id: string; name: string };
	const currentTeam = (dispensaries || []).find(
		(team) => team.slug === router.query.slug,
	);

	const menus = [
		{
			id: 2,
			name: t('teams'),
			items: (dispensaries || []).map((team) => ({
				id: team.id,
				name: team.name,
				href: `/teams/${team.slug}/home`,
				icon: FolderIcon,
			})),
		},
		{
			id: 1,
			name: t('account'),
			items: [
				{
					id: user?.id,
					name: user?.name,
					href: '/settings/account',
					icon: UserCircleIcon,
				},
			],
		},
		{
			id: 3,
			name: '',
			items: [
				{
					id: 'all-teams',
					name: t('all-teams'),
					href: '/teams',
					icon: RectangleStackIcon,
				},
				{
					id: 'new-team',
					name: t('new-team'),
					href: '/teams?newTeam=true',
					icon: FolderPlusIcon,
				},
			],
		},
	];

	return (
		<div className="dropdown w-full">
			<div
				tabIndex={0}
				// className="border border-gray-300 dark:border-gray-600 flex h-10 items-center px-4 justify-between cursor-pointer rounded text-sm font-bold"
				className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800 flex h-10 items-center px-4 justify-between cursor-pointer rounded font-semibold"
			>
				{currentTeam?.name ||
					data?.user?.name?.substring(
						0,
						maxLengthPolicies.nameShortDisplay,
					)}{' '}
				<ChevronUpDownIcon className="w-5 h-5" />
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content dark:border-gray-600 p-2 shadow-md bg-light w-full rounded-b border-t"
			>
				{menus.map(({ id, name, items }) => {
					return (
						<React.Fragment key={id}>
							{name && (
								<li
									className="text-xs text-gray-500 py-1 px-2"
									key={`${id}-name`}
								>
									{name}
								</li>
							)}
							{items.map((item) => (
								<li
									key={`${id}-${item.id}`}
									onClick={() => {
										if (document.activeElement) {
											(document.activeElement as HTMLElement).blur();
										}
									}}
								>
									<Link href={item.href}>
										<div className="flex hover:bg-gray-100 hover:dark:text-black focus:bg-gray-100 focus:outline-none p-2 rounded text-sm font-medium gap-2 items-center">
											<item.icon className="w-5 h-5" /> {item.name}
										</div>
									</Link>
								</li>
							))}
							{name && <li className="divider m-0" key={`${id}-divider`} />}
						</React.Fragment>
					);
				})}
			</ul>
		</div>
	);
};

export default TeamDropdown;
