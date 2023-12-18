/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	getShopSite,
	modalActions,
	modalTypes,
	replaceRelativePath,
	selectCartState,
	selectIsCartEmpty,
	selectUserState,
	TextContent,
	truncateWordsAndLeaveN,
} from '@cd/core-lib';
import {
	Button,
	FlexBox,
	H2,
	IconButton,
	Icons,
	IconWrapper,
	Paragraph,
	styles,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
import { helpTopics } from './HelpTopics';

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
			<Link href={getShopSite('/')} className="shrink-0">
				<Image alt="Gras" width={50} height={50} src={logo} />
			</Link>

			<Link href={getShopSite('/')}>
				<H2 className="text-secondary pt-0.5">Gras</H2>
			</Link>

			<Link href={getShopSite('/')}>
				<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
					{TextContent.info.CANNABIS_DELIVERED_TEXT}
				</Paragraph>
			</Link>
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
								Sign In
							</Button>
						</FlexBox>
						<label tabIndex={0} className="md:hidden">
							<IconButton
								className={twMerge(styles.BUTTON.highlight, 'pt-1')}
								size="sm"
								bg="transparent"
								hover="transparent"
								Icon={Icons.OverflowMenuHorizontal}
								iconSize={28}
							/>
						</label>
					</>
				)}
				<ul
					tabIndex={0}
					id="Account-Dropdown"
					className={twMerge(
						'menu dropdown-content bg-inverse top-0 absolute right-0 mt-12 w-48 rounded shadow',
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
								Sign In
							</Button>
						</FlexBox>
					)) || <></>}
					{Object.keys(helpTopics).map((key, index) => (
						<FlexBox
							key={`nav-help-topic-${index}`}
							className="active:bg-accent-soft focus:bg-accent-soft w-full lg:hidden"
						>
							<Link href={`?topic=${key}`} className="w-full">
								<Button
									bg="transparent"
									hover="transparent"
									className={twMerge(styles.BUTTON.highlight, 'pt-1 w-full')}
								>
									{truncateWordsAndLeaveN(
										helpTopics[key as keyof typeof helpTopics]['title'],
										2,
									)}
								</Button>
							</Link>
						</FlexBox>
					))}
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
										Icon={Icons.Help}
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
										Settings
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
									Sign Out
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
