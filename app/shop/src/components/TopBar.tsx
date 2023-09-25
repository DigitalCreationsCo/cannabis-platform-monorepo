/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
	getShopSite,
	modalActions,
	modalTypes,
	selectCartState,
	selectIsCartEmpty,
	selectUserState,
	TextContent,
} from '@cd/core-lib';
import {
	Button,
	FlexBox,
	H2,
	IconButton,
	Icons,
	Paragraph,
	styles,
	useOnClickOutside,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export type TopBarProps = {
	doesSessionExist?: boolean;
	signOut: () => void;
};

function TopBar({ signOut }: TopBarProps) {
	const dispatch = useDispatch();
	const { user, isSignedIn } = useSelector(selectUserState);
	const cart = useSelector(selectCartState);
	const isCartEmpty = useSelector(selectIsCartEmpty);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			}),
		);
	}

	const _AccountDropDown = useCallback(AccountDropDown, [
		user.profilePicture?.location,
		user.username,
	]);

	return (
		<div className={twMerge(styles.TOPBAR.topbar)}>
			<Link href={getShopSite('/')} className="pr-2">
				<Image alt="Gras" width={50} height={50} src={logo} />
			</Link>

			<Link href={getShopSite('/')}>
				<H2 className="text-secondary pt-0.5">Gras</H2>
			</Link>

			<Link href={getShopSite('/')}>
				<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
					Cannabis Marketplace
				</Paragraph>
			</Link>
			<div className="flex-1"></div>

			<FlexBox className="flex flex-row items-center space-x-4 px-4 pr-2">
				{isSignedIn && (
					<Link
						className={twMerge('hidden sm:block', styles.BUTTON.highlight)}
						href={getShopSite('/support')}
					>
						<Paragraph className={twMerge('whitespace-nowrap pt-1')}>
							Get Support
						</Paragraph>
					</Link>
				)}

				<Link href={getShopSite('/mybag')}>
					<IconButton
						className={twMerge(styles.BUTTON.highlight, 'indicator')}
						iconSize={24}
						size="sm"
						hover="transparent"
						bg="transparent"
						Icon={Icons.ShoppingBag}
						iconColor={'dark'}
						// onClick={openCartModal}
					>
						{(isCartEmpty && <></>) || (
							<div className={twMerge(styles.TOPBAR.badge)}>
								{cart.totalItems}
							</div>
						)}
					</IconButton>
				</Link>
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
							Sign In
						</Button>
					</FlexBox>
				)}
			</FlexBox>
		</div>
	);

	function AccountDropDown() {
		const [open, setOpen] = useState(false);
		const ref = useRef(null);
		useOnClickOutside(ref, () => setOpen(false));
		return (
			<details
				id="Account-Icon"
				ref={ref}
				className={twMerge(`dropdown dropdown-bottom`)}
			>
				<summary
					onClick={() => setOpen((prev) => !prev)}
					className="btn btn-ghost rounded-full"
				>
					<Image
						src={(user.profilePicture?.location as string) || logo}
						alt={user.email}
						width={40}
						height={40}
						className="rounded-full border"
						loader={({ src }) => src}
						unoptimized
					/>
				</summary>
				<ul
					id="Account-Dropdown"
					className={twMerge(
						open ? 'absolute' : 'hidden',
						'menu dropdown-content bg-inverse top-0 absolute right-0 my-4 w-48 rounded border shadow',
					)}
				>
					<FlexBox className="hover:bg-accent-soft">
						<Link
							className="w-full"
							href={TextContent.href.settings_f(user.id)}
						>
							<Button
								size="md"
								bg="transparent"
								className="w-full place-self-center self-center"
							>
								Settings
							</Button>
						</Link>
					</FlexBox>
					<FlexBox className="hover:bg-accent-soft">
						<Button
							size="md"
							className="w-full"
							bg="transparent"
							onClick={signOut}
						>
							Sign Out
						</Button>
					</FlexBox>
				</ul>
			</details>
			// <div className="dropdown dropdown-end">
			// 	<label className="btn btn-ghost rounded-btn">
			// 		<Image
			// 			tabIndex={0}
			// 			src={(user.profilePicture?.location as string) || logo}
			// 			alt={user.email}
			// 			width={40}
			// 			height={40}
			// 			className="rounded-full border"
			// 			loader={({ src }) => src}
			// 			unoptimized
			// 		/>
			// 	</label>
			// 	<ul
			// 		tabIndex={0}
			// 		id="Account-Dropdown"
			// 		// className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
			// 		className={twMerge(
			// 			'menu dropdown-content bg-inverse top-0 absolute right-0 mt-14 w-48 rounded border shadow',
			// 		)}
			// 	>
			// 		<FlexBox>
			// 			<Button size="md" bg="transparent" hover="transparent">
			// 				<Link href={'/settings'}>Settings</Link>
			// 			</Button>
			// 		</FlexBox>
			// 		<FlexBox>
			// 			<Button
			// 				size="md"
			// 				bg="transparent"
			// 				hover="transparent"
			// 				onClick={signOut}
			// 			>
			// 				Sign Out
			// 			</Button>
			// 		</FlexBox>
			// 	</ul>
			// </div>
		);
	}
}

export default TopBar;
