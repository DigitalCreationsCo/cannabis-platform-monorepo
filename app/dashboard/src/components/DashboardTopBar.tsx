import {
	getDashboardSite,
	modalActions,
	modalTypes,
	selectUserState,
} from '@cd/core-lib';
import { Button, FlexBox, H2, Paragraph, styles } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export type TopBarProps = {
	signOut: () => void;
};

function DashboardTopBar({ signOut }: TopBarProps) {
	const dispatch = useDispatch();
	const { user, isSignedIn } = useSelector(selectUserState);
	const dispensary = {
		image: '',
		name: '',
	};

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
			<Link href={getDashboardSite('/')} passHref>
				<Image alt="Gras" width={50} height={50} src={logo} />
			</Link>
			<Link href={getDashboardSite('/')}>
				<H2 className="text-secondary pt-0.5">Gras</H2>
			</Link>

			<div className="flex-1"></div>

			<FlexBox className="flex flex-row items-center space-x-4 px-4 pr-2">
				{isSignedIn && (
					<Link
						className={twMerge('hidden sm:block', styles.BUTTON.highlight)}
						href={getDashboardSite('/support')}
					>
						<Paragraph className={twMerge('whitespace-nowrap pt-1')}>
							Get Support
						</Paragraph>
					</Link>
				)}
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
	function DispensaryAccountDropDown() {
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
						src={dispensary.image || logo}
						alt={dispensary.name}
						width={40}
						height={40}
						className="rounded-full border"
						loader={({ src }) => src}
						priority
						// remove unoptimized when using a proper url for the image
						unoptimized
					/>
				</Button>
				<ul className="menu dropdown-content bg-inverse relative bottom-0 right-0 mt-2 w-48 rounded border shadow">
					<FlexBox>
						<Button size="md" bg="transparent" hover="transparent">
							<Link href={getDashboardSite('/site-settings')}>Settings</Link>
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

export default DashboardTopBar;
