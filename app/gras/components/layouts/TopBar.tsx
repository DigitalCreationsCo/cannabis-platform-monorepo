import {
	modalActions,
	modalTypes,
	replaceRelativePath,
	selectCartState,
	selectIsCartEmpty,
	selectUserState,
	TextContent,
} from '@cd/core-lib';
import {
	Button,
	FlexBox,
	GrasSignature,
	IconButton,
	Icons,
	Paragraph,
	styles,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
import { useTranslation } from 'next-i18next';

export type TopBarProps = {
	doesSessionExist?: boolean;
	signOut: () => void;
	showSearch?: boolean;
	SearchComponent: React.ReactNode | null;
	showLocation?: boolean;
};

function TopBar({
	signOut,
	showSearch = true,
	SearchComponent,
}: TopBarProps) {
	const dispatch = useDispatch();
	const { user, isSignedIn } = useSelector(selectUserState);
	const cart = useSelector(selectCartState);
	const isCartEmpty = useSelector(selectIsCartEmpty);
	const { t } = useTranslation('common');

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			}),
		);
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const _AccountDropDown = useCallback(AccountDropDown, [
		user.profilePicture?.location,
		user.username,
	]);

	return (
		<div className={twMerge(styles.TOPBAR.topbar)}>
			<FlexBox>
				<FlexBox className="flex-row items-center">
					<Link href={'/'} className="z-50">
						<GrasSignature className="text-secondary pt-1 pb-0 mb-0 leading-3">
							{t('gras')}
						</GrasSignature>
					</Link>
					<Link href={'/'}>
						<Image alt="Gras" width={40} height={40} src={logo} />
					</Link>
				</FlexBox>
				<Link href={'/'}>
					<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
			</FlexBox>

			{/* {showLocation && (
				// <Paragraph>Location: {user.address[0].zipcode || 10011}</Paragraph>
				<Paragraph>Location: 10011</Paragraph>
			)} */}

			<div className="flex grow">{(showSearch && SearchComponent) || null}</div>

			<FlexBox className="flex flex-row items-center md:space-x-4 md:pr-2">
				{/* SHOW ACCOUNT DROPDOWN BUTTON OR SIGNIN */}
				{isSignedIn && <_AccountDropDown />}
				{!isSignedIn && (
					<FlexBox>
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
				)}

				{/* SHOW CART BUTTON WITH BADGE OR PLAIN CART BUTTON */}
				<Link href={replaceRelativePath(TextContent.href.bag)}>
					<IconButton
						className={twMerge(styles.BUTTON.highlight, 'pt-0.5 indicator')}
						iconSize={28}
						size="sm"
						hover="transparent"
						bg="transparent"
						Icon={Icons.ShoppingBag}
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
				<label className="btn btn-ghost h-[54px] w-[54px] rounded-full p-0">
					<Image
						tabIndex={0}
						src={(user.profilePicture?.location as string) || logo}
						alt={user.email || 'my account'}
						width={40}
						height={40}
						className="rounded-full border"
						loader={({ src }) => src}
						unoptimized
					/>
				</label>
				<ul
					tabIndex={0}
					id="Account-Dropdown"
					className={twMerge(
						'menu dropdown-content bg-inverse top-0 absolute right-0 mt-12 w-48 rounded shadow',
					)}
				>
					{isSignedIn && (
						<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
							<Link
								className={twMerge('w-full')}
								href={TextContent.href.support}
							>
								<Button
									size="md"
									bg="transparent"
									hover="transparent"
									className={twMerge(styles.BUTTON.highlight, 'w-full', 'pt-1')}
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
								className={twMerge(styles.BUTTON.highlight, 'w-full', 'pt-1')}
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
							className={twMerge(styles.BUTTON.highlight, 'w-full', 'pt-1')}
							onClick={signOut}
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
