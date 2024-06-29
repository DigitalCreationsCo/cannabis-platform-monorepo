/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	modalActions,
	modalTypes,
	selectCartState,
	selectIsCartEmpty,
	TextContent,
} from '@cd/core-lib';
import { Button, FlexBox, GrasSignature, Paragraph, styles } from '@cd/ui-lib';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export interface TopBarProps {
	doesSessionExist?: boolean;
	showSearch?: boolean;
	SearchComponent: React.ReactNode | null;
	showLocation?: boolean;
}

function TopBar({ showSearch = true, SearchComponent }: TopBarProps) {
	const { t } = useTranslation('common');
	const dispatch = useDispatch();

	const { data } = useSession();
	const user = data?.user;

	const cart = useSelector(selectCartState);
	const isCartEmpty = useSelector(selectIsCartEmpty);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			})
		);
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const _AccountDropDown = useCallback(AccountDropDown, [user]);

	return (
		<div className={twMerge([styles.TOPBAR.topbar, 'bg-transparent pb-0'])}>
			<FlexBox>
				<FlexBox className="flex-row items-center gap-x-2">
					<Link href={'/'} className="z-50">
						<GrasSignature className="text-inverse lg:text-4xl drop-shadow-lg pt-1 pb-0 mb-0 leading-3">
							{t('gras')}
						</GrasSignature>
					</Link>
					<Link href={'/'} className="p-0.25 w-fit rounded-full">
						<Image
							alt="Gras"
							className="w-[36px] md:w-[48px]"
							src={logo}
							quality={25}
						/>
					</Link>
				</FlexBox>
				<Link href={'/'}>
					<Paragraph className={twMerge(styles.TOPBAR.tagline, 'text-light')}>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
			</FlexBox>

			{/* {showLocation && (
				// <Paragraph>Location: {user.address[0].zipcode || 10011}</Paragraph>
				<Paragraph>Location: 10011</Paragraph>
			)} */}

			<div className="flex grow justify-center">
				{(showSearch && SearchComponent) || null}
			</div>

			<FlexBox className="flex flex-row items-center md:space-x-4 md:pr-2">
				{/* SHOW ACCOUNT DROPDOWN BUTTON OR SIGNIN */}
				{user && <_AccountDropDown />}
				{!user && (
					<FlexBox>
						{/* <Link href="/auth/login"> */}
						<Button
							className={twMerge(
								styles.BUTTON.highlight,
								'hover:border-light text-light'
							)}
							size="sm"
							bg="transparent"
							hover="transparent"
							onClick={openLoginModal}
						>
							{t('sign-in')}
						</Button>
						{/* </Link> */}
					</FlexBox>
				)}
			</FlexBox>
		</div>
	);

	function AccountDropDown() {
		return (
			<div className="dropdown dropdown-end m-0 p-0">
				<label className="btn btn-ghost h-[54px] w-[54px] rounded-full p-0">
					<Image
						tabIndex={0}
						src={user?.image ?? logo}
						alt={'my account'}
						width={40}
						height={40}
						className="rounded-full border"
						quality={25}
						loader={({ src }) => src}
						unoptimized
					/>
				</label>
				<ul
					tabIndex={0}
					id="Account-Dropdown"
					className={twMerge(
						'menu dropdown-content bg-inverse top-0 absolute right-0 mt-12 w-48 rounded shadow'
					)}
				>
					{user && (
						<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
							<Link
								className={twMerge('w-full')}
								href={TextContent.href.support}
							>
								<Button
									size="md"
									bg="transparent"
									hover="transparent"
									className={twMerge(
										styles.BUTTON.highlight,
										'hover:border-light text-light',
										'w-full'
									)}
								>
									{t('contact-support')}
								</Button>
							</Link>
						</FlexBox>
					)}
					<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
						<Link href={TextContent.href.settings} className="w-full">
							<Button
								size="md"
								bg="transparent"
								hover="transparent"
								className={twMerge(
									styles.BUTTON.highlight,
									'hover:border-light text-light',
									'w-full'
								)}
							>
								{t('settings')}
							</Button>
						</Link>
					</FlexBox>
					<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
						<Button
							size="md"
							bg="transparent"
							hover="transparent"
							className={twMerge(
								styles.BUTTON.highlight,
								'hover:border-light text-light',
								'w-full'
							)}
							onClick={() => signOut()}
						>
							{t('sign-out')}
						</Button>
					</FlexBox>
				</ul>
			</div>
		);
	}
}

export default TopBar;
