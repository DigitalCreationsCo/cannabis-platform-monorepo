import {
	getDashboardSite,
	modalActions,
	modalTypes,
	selectUserState,
} from '@cd/core-lib';
import { Button, FlexBox, H2, Paragraph, styles } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export type TopBarProps = {
	signOut: () => void;
};

function AdminTopBar({ signOut }: TopBarProps) {
	const dispatch = useDispatch();
	const { user, isSignedIn } = useSelector(selectUserState);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			})
		);
	}

	return (
		<div className={twMerge(styles.TOPBAR.topbar)}>
			<Link href={getDashboardSite('/')} passHref>
				<Image alt="Gras" width={50} height={50} src={logo} />
			</Link>
			<Link href={getDashboardSite('/')}>
				<H2 className="pt-0.5">Gras</H2>
			</Link>

			<div className="flex-1"></div>

			<FlexBox className="flex flex-row space-x-2 items-center pr-0 px-4">
				{isSignedIn && (
					<Link
						className={twMerge(
							'hidden sm:block',
							styles.BUTTON.highlight
						)}
						href={getDashboardSite('/support')}
					>
						<Paragraph
							className={twMerge('whitespace-nowrap pt-1')}
						>
							Get Support
						</Paragraph>
					</Link>
				)}

				{isSignedIn ? (
					<>
						<Link href={getDashboardSite('/support')}>
							<Paragraph
								className={twMerge(
									'pt-1',
									'px-3',
									'text-md',
									'whitespace-nowrap'
								)}
							>
								Need Support?
							</Paragraph>
						</Link>
						<FlexBox>
							<Button onClick={signOut}>Sign Out</Button>
						</FlexBox>
					</>
				) : (
					<Button
						className="pt-1"
						size="sm"
						bg="transparent"
						hover="transparent"
						onClick={openLoginModal}
					>
						Sign In
					</Button>
				)}
			</FlexBox>
		</div>
	);
}

export default AdminTopBar;
