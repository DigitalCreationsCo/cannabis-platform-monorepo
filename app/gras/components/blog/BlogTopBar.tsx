/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { TextContent } from '@gras/core/constants';
import {
	modalActions,
	selectCartState,
	selectIsCartEmpty,
	selectUserState,
} from '@gras/core/reducer';
import { modalTypes } from '@gras/core/types';
import { replaceRelativePath } from '@gras/core/utils';
import {
	Button,
	FlexBox,
	GrasSignature,
	IconButton,
	Paragraph,
	styles,
} from '@gras/ui';
import {
	ShoppingCartIcon,
	EllipsisHorizontalIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export interface TopBarProps {
	doesSessionExist?: boolean;
	signOut: () => void;
}

function TopBar({ signOut }: TopBarProps) {
	const { t } = useTranslation('common');
	const dispatch = useDispatch();
	const { user, isSignedIn } = useSelector(selectUserState);
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
	const _AccountDropDown = useCallback(AccountDropDown, [
		user.profilePicture?.location,
		user.username,
	]);

	return (
		<div className={twMerge(styles.TOPBAR.topbar)}>
			<FlexBox className="flex-row items-center">
				<Link href={'/'} className="z-50">
					<GrasSignature className="text-secondary pt-0.5">
						{t('gras')}
					</GrasSignature>
				</Link>
				<Link href={'/'} className="shrink-0">
					<Image alt="Gras" width={40} height={40} src={logo} quality={25} />
				</Link>
				<Link href={'/'}>
					<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
			</FlexBox>
			<div className="flex-1"></div>
			<FlexBox className="flex flex-row items-center md:space-x-4 md:pr-2">
				<_AccountDropDown />
				<Link href={replaceRelativePath(TextContent.href.bag)}>
					<IconButton
						className={twMerge(styles.BUTTON.highlight, 'pt-0.5 indicator')}
						iconSize={28}
						size="sm"
						hover="transparent"
						bg="transparent"
						Icon={ShoppingCartIcon}
						iconColor={'dark'}
					>
						{(isCartEmpty && <></>) || (
							<div className={twMerge(styles.TOPBAR.badge)}>
								{cart.totalItems}
							</div>
						)}
					</IconButton>
				</Link>
			</FlexBox>
		</div>
	);

	function AccountDropDown() {
		return (
			<div className="dropdown dropdown-end m-0 p-0">
				{isSignedIn ? (
					<label className="btn btn-ghost h-[54px] w-[54px] rounded-full p-0">
						<Image
							tabIndex={0}
							src={(user.profilePicture?.location as string) || logo}
							alt={user.email}
							width={40}
							height={40}
							className="rounded-full border"
							loader={({ src }) => src}
							quality={25}
							unoptimized
						/>
					</label>
				) : (
					<>
						<FlexBox className="active:bg-accent-soft focus:bg-accent-soft hidden w-full md:block">
							<Button
								className={twMerge(styles.BUTTON.highlight, 'pt-1')}
								size="sm"
								bg="transparent"
								hover="transparent"
								onClick={openLoginModal}
							>
								{t('sign-in')}
							</Button>
						</FlexBox>
						<label tabIndex={0} className="md:hidden">
							<IconButton
								className={twMerge(styles.BUTTON.highlight, 'pt-1')}
								size="sm"
								bg="transparent"
								hover="transparent"
								Icon={EllipsisHorizontalIcon}
								iconSize={28}
							/>
						</label>
					</>
				)}
				<ul
					tabIndex={0}
					id="Account-Dropdown"
					className={twMerge(
						'menu dropdown-content bg-inverse top-0 absolute right-0 mt-12 w-48 rounded shadow'
					)}
				>
					{(!isSignedIn && (
						<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full md:hidden">
							<Button
								className={twMerge(styles.BUTTON.highlight, 'pt-1 w-full')}
								bg="transparent"
								hover="transparent"
								onClick={openLoginModal}
							>
								{t('sign-in')}
							</Button>
						</FlexBox>
					)) || <></>}
					{(isSignedIn && (
						<>
							<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
								<Link
									className={twMerge('hidden sm:block')}
									href={TextContent.href.support}
								>
									<IconButton
										className={twMerge(styles.BUTTON.highlight, 'pt-0.5')}
										iconSize={28}
										hover="transparent"
										bg="transparent"
										Icon={QuestionMarkCircleIcon}
										iconColor={'dark'}
									></IconButton>
								</Link>
							</FlexBox>
							<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
								<Link href={TextContent.href.settings} className="w-full">
									<Button
										bg="transparent"
										hover="transparent"
										className="w-full"
									>
										{t('settings')}
									</Button>
								</Link>
							</FlexBox>
							<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
								<Button
									bg="transparent"
									hover="transparent"
									className="w-full"
									onClick={signOut}
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

export default TopBar;
