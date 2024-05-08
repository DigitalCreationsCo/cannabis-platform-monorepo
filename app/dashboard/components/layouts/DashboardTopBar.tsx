/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getShopSite, TextContent } from '@cd/core-lib';
import { Button, FlexBox, GrasSignature, Paragraph, styles } from '@cd/ui-lib';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
import { getNavLinkGroups } from './DashBoardNavigation';

function DashboardTopBar() {
	const { t } = useTranslation('common');
	const { data } = useSession();

	const user = data?.user;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const _AccountDropDown = useCallback(DispensaryAccountDropDown, [user]);

	return (
		<div className={twMerge(styles.TOPBAR.topbar)}>
			<FlexBox>
				<FlexBox className="flex-row items-center">
					<Link href={user ? '/' : getShopSite('/')} className="z-50">
						<GrasSignature className="text-secondary pt-1 pb-0 mb-0 leading-3">
							{t('gras')}
						</GrasSignature>
					</Link>
					<Link href={user ? '/' : getShopSite('/')} className="shrink-0">
						<Image alt="Gras" width={40} height={40} src={logo} />
					</Link>
				</FlexBox>
				<Link href={user ? '/' : getShopSite('/')}>
					<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
			</FlexBox>
			<div className="flex-1"></div>

			<FlexBox className="flex flex-row items-center md:space-x-4 md:pr-2">
				{/* SHOW ACCOUNT DROPDOWN BUTTON OR SIGNIN */}
				{user && <_AccountDropDown />}
				{!user && (
					<FlexBox>
						<Link href="/auth/login">
							<Button
								className={twMerge(styles.BUTTON.highlight, 'pt-1')}
								size="sm"
								bg="transparent"
								hover="transparent"
							>
								{t('sign-in')}
							</Button>
						</Link>
					</FlexBox>
				)}
			</FlexBox>
		</div>
	);
	function DispensaryAccountDropDown() {
		return (
			<div className="dropdown dropdown-end m-0 p-0">
				<label
					tabIndex={0}
					className={twMerge('btn btn-ghost p-0', styles.BUTTON.highlight)}
					onClick={() => {
						// hide menu on click
						const dropdown = document.getElementById('Account-Dropdown');
						if (dropdown) {
							dropdown.classList.toggle('hidden');
						}
					}}
				>
					{t('account')}
				</label>
				<ul
					tabIndex={0}
					id="Account-Dropdown"
					className={twMerge(
						'menu dropdown-content bg-inverse top-0 absolute right-0 mt-14 md:mt-16 w-48 rounded shadow-lg border',
					)}
				>
					{(!user && (
						<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full md:hidden">
							<Link href="/auth/login" className="w-full">
								<Button
									className={twMerge('pt-1 w-full')}
									bg="transparent"
									size="sm"
									hover="transparent"
								>
									{t('sign-in')}
								</Button>
							</Link>
						</FlexBox>
					)) || <></>}
					{(user && (
						<>
							{Object.values(getNavLinkGroups('dispensary-id').flat()).map(
								(link, index) => (
									<FlexBox
										key={`nav-dashboard-${index}`}
										className="active:bg-accent-soft focus:bg-accent-soft w-full"
									>
										<Link href={link.href} className="w-full">
											<Button
												bg="transparent"
												hover="transparent"
												className={twMerge(
													styles.BUTTON.highlight,
													'w-full',
													'pt-1',
												)}
											>
												{link.title}
											</Button>
										</Link>
									</FlexBox>
								),
							)}
							<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
								<Link
									className={twMerge('hidden sm:block w-full')}
									href={TextContent.href.support}
								>
									<Button
										size="md"
										bg="transparent"
										hover="transparent"
										className={twMerge(
											styles.BUTTON.highlight,
											'w-full',
											'pt-1',
										)}
									>
										{t('contact-support')}
									</Button>
								</Link>
							</FlexBox>
							<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
								<Button
									bg="transparent"
									hover="transparent"
									className={twMerge(styles.BUTTON.highlight, 'w-full', 'pt-1')}
									onClick={() => signOut()}
								>
									{t('sign-out')}
								</Button>
							</FlexBox>
						</>
					)) || <></>}
				</ul>
			</div>
		);
	}
}

export default DashboardTopBar;
