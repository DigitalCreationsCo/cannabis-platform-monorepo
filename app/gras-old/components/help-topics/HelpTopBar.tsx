/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { TextContent } from '@gras/core/constants';
import {
	modalActions,
	selectCartState,
	selectIsCartEmpty,
	selectUserState,
} from '@gras/core/reducer';
import { modalTypes } from '@gras/core/types';
import { FlexBox, GrasSignature, Paragraph, styles } from '@gras/ui';
import Image from 'next/image';
import Link from 'next/link';
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

	return (
		<div className={twMerge(styles.TOPBAR.topbar)}>
			<FlexBox className="flex-row items-center">
				<Link href={'/'} className="z-50">
					<GrasSignature className="text-secondary pt-0.5">Gras</GrasSignature>
				</Link>
				<Link href={'/'} className="shrink-0">
					<Image alt="Gras" width={40} height={40} src={logo} />
				</Link>
				<Link href={'/'}>
					<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
			</FlexBox>
			<div className="flex-1"></div>
		</div>
	);
}

export default TopBar;
