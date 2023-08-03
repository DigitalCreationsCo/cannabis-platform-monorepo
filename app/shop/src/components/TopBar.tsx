import {
	getShopSite,
	modalActions,
	modalTypes,
	selectCartState,
	selectIsCartEmpty,
	selectUserState
} from '@cd/core-lib';
import {
	Button,
	FlexBox,
	H2,
	IconButton,
	Icons,
	Paragraph,
	styles
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
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
			})
		);
	}

	const MemoizedDropDown = useCallback(AccountDropDown, [
		signOut,
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

			<FlexBox className="flex flex-row items-center space-x-2 px-4 pr-0">
				{isSignedIn && (
					<Link
						className={twMerge(
							'hidden sm:block',
							styles.BUTTON.highlight
						)}
						href={getShopSite('/support')}
					>
						<Paragraph
							className={twMerge('whitespace-nowrap pt-1')}
						>
							Get Support
						</Paragraph>
					</Link>
				)}

				{window?.location?.pathname === '/' || (
					<Link href={getShopSite('/mybag')}>
						<Button
							size="sm"
							bg="transparent"
							hover="transparent"
							className={twMerge(styles.BUTTON.highlight)}
						>
							<IconButton
								// onClick={openCartModal}
								iconSize={24}
								className="indicator btn m-0 border-none bg-transparent px-4 pt-1 capitalize shadow-none focus:outline-none"
								size="sm"
								hover="transparent"
								Icon={Icons.ShoppingBag}
								iconColor={'dark'}
							>
								{/* <Paragraph className="hidden md:block">{`Bag`}</Paragraph> */}
								{(isCartEmpty && <></>) || (
									<div
										className={twMerge(styles.TOPBAR.badge)}
									>
										{cart.totalItems}
									</div>
								)}
							</IconButton>
						</Button>
					</Link>
				)}
				{isSignedIn && <MemoizedDropDown />}
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
		return (
			<div className="dropdown dropdown-bottom relative">
				<Button
					className="btn border-none px-0 outline-none focus:outline-none"
					size="sm"
					border={false}
					bg="transparent"
					hover="transparent"
				>
					<Image
						src={user.profilePicture?.location as string}
						alt={user.username}
						width={40}
						height={40}
						className="rounded-full border"
						loader={({ src }) => src}
						priority
					/>
				</Button>
				<ul className="menu dropdown-content bg-inverse relative bottom-0 right-0 mt-2 w-48 rounded border shadow">
					<FlexBox>
						<Button size="md" bg="transparent" hover="transparent">
							<Link href={getShopSite('/settings')}>
								Settings
							</Link>
						</Button>
					</FlexBox>
					<FlexBox>
						<Button
							size="md"
							bg="transparent"
							hover="transparent"
							onClick={signOut}
						>
							Sign Out
						</Button>
					</FlexBox>
				</ul>
			</div>
		);
	}
}

export default TopBar;
