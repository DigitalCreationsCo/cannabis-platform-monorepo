import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import TeamDropdown from '../TeamDropdown';
import Brand from './Brand';
import Navigation from './Navigation';

interface DrawerProps {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
	stayOpen: boolean;
}

const Drawer = ({ sidebarOpen, setSidebarOpen, stayOpen }: DrawerProps) => {
	const { t } = useTranslation('common');

	// eslint-disable-next-line import/no-named-as-default-member

	return (
		<>
			{sidebarOpen && (
				<div className="relative z-50 lg:hidden">
					<div className="fixed inset-0 bg-gray-600/80" />
					<div className="fixed inset-0 flex">
						<div className="relative mr-16 flex w-full max-w-xs flex-1">
							<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
								<button
									type="button"
									className="-m-2.5 p-2.5"
									onClick={() => setSidebarOpen(false)}
								>
									<span className="sr-only">{t('close-sidebar')}</span>
									<XMarkIcon
										className="h-6 w-6 text-white"
										aria-hidden="true"
									/>
								</button>
							</div>
							<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-inverse dark:bg-black px-4 pb-4">
								<Brand />
								<TeamDropdown />
								<Navigation />
							</div>
						</div>
					</div>
				</div>
			)}

			<div
				className={twMerge(
					(sidebarOpen && 'lg:w-64') || 'lg:w-20 hover:lg:w-64',
					'hidden lg:!fixed lg:inset-y-0 lg:z-50 lg:!flex lg:flex-col bg-inverse transition-width transition-50'
				)}
				onMouseEnter={() => !stayOpen && setSidebarOpen(true)}
				onMouseLeave={() => !stayOpen && setSidebarOpen(false)}
			>
				<div className="flex grow flex-col gap-y-5">
					<Brand />
					<TeamDropdown isExpanded={sidebarOpen} />
					<Navigation isExpanded={sidebarOpen} />
				</div>
				{/* </div> */}
			</div>
		</>
	);
};

export default Drawer;
