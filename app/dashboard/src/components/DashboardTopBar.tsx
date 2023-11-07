/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
	getShopSite,
	modalActions,
	modalTypes,
	selectDispensaryState,
	selectUserState,
	TextContent,
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
import { getNavLinkGroups } from './DashBoardNavigation';

export type TopBarProps = {
	signOut: () => void;
};

function DashboardTopBar({ signOut }: TopBarProps) {
	const dispatch = useDispatch();
	const { user, isSignedIn } = useSelector(selectUserState);
	const { dispensary } = useSelector(selectDispensaryState);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			}),
		);
	}

	const _AccountDropDown = useCallback(DispensaryAccountDropDown, [
		user.profilePicture?.location,
		user.username,
	]);

	return (
		<div className={twMerge(styles.TOPBAR.topbar)}>
			<Link
				href={isSignedIn ? '/' : getShopSite('/')}
				passHref
				className="shrink-0"
			>
				<Image alt="Gras" width={50} height={50} src={logo} />
			</Link>
			<Link href={isSignedIn ? '/' : getShopSite('/')}>
				<H2 className="text-secondary pt-0.5">Gras</H2>
			</Link>

			<Link href={isSignedIn ? '/' : getShopSite('/')}>
				<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
					{TextContent.info.CANNABIS_DELIVERED_TEXT}
				</Paragraph>
			</Link>
			<div className="flex-1"></div>

			<FlexBox className="flex flex-row items-center space-x-4 px-4 pr-2">
				{isSignedIn && (
					<Link
						className={twMerge('hidden sm:block')}
						href={TextContent.href.support}
					>
						<IconButton
							className={twMerge(styles.BUTTON.highlight, 'pt-0.5')}
							iconSize={28}
							size="sm"
							hover="transparent"
							bg="transparent"
							Icon={Icons.Help}
							iconColor={'dark'}
						></IconButton>
					</Link>
				)}
				<_AccountDropDown />
				{/* {!isSignedIn && (
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
				)} */}
			</FlexBox>
		</div>
	);
	function DispensaryAccountDropDown() {
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
						<label
							tabIndex={0}
							className="btn btn-ghost h-[54px] w-[54px] rounded-full p-0 md:hidden"
						>
							<IconWrapper Icon={Icons.Menu} iconSize={28} />
						</label>
					</>
				)}
				<ul
					tabIndex={0}
					id="Account-Dropdown"
					className={twMerge(
						'menu dropdown-content bg-inverse top-0 absolute right-0 mt-14 w-48 rounded shadow',
					)}
				>
					{(!isSignedIn && (
						<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full md:hidden">
							<Button
								className={twMerge('pt-1 w-full')}
								size="md"
								bg="transparent"
								hover="transparent"
								onClick={openLoginModal}
							>
								Sign In
							</Button>
						</FlexBox>
					)) || <></>}
					{(isSignedIn && (
						<>
							{/* <FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
								<Link href={TextContent.href.settings} className="w-full">
									<Button
										size="md"
										bg="transparent"
										hover="transparent"
										className="w-full"
									>
										Settings
									</Button>
								</Link>
							</FlexBox> */}
							{Object.values(getNavLinkGroups(dispensary.id).flat()).map(
								(link, index) => (
									<FlexBox
										key={`nav-dashboard-${index}`}
										className="active:bg-accent-soft focus:bg-accent-soft w-full md:hidden"
									>
										<Link href={link.href} className="w-full">
											<Button
												size="md"
												bg="transparent"
												hover="transparent"
												className="w-full"
											>
												{link.title}
											</Button>
										</Link>
									</FlexBox>
								),
							)}
							<FlexBox className="active:bg-accent-soft focus:bg-accent-soft w-full">
								<Button
									size="md"
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

export default DashboardTopBar;
