/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	modalActions,
	modalTypes,
	selectCartState,
	selectIsCartEmpty,
	TextContent,
} from '@cd/core-lib';
import {
	Button,
	DropDown,
	FlexBox,
	GrasSignature,
	Paragraph,
	styles,
} from '@cd/ui-lib';
import { is } from 'cheerio/lib/api/traversing';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
import UserNavigation from '../shared/shell/UserNavigation';

export interface TopBarProps {
	showSearch?: boolean;
	SearchComponent?: React.ReactNode | null;
	showLocation?: boolean;
	className?: string;
}

function TopBar({
	showSearch = true,
	SearchComponent,
	className,
}: TopBarProps) {
	const { t } = useTranslation('common');
	const dispatch = useDispatch();

	const { data } = useSession();
	const user = data?.user;

	const cart = useSelector(selectCartState);
	const isCartEmpty = useSelector(selectIsCartEmpty);
	const [isOpen, setIsOpen] = useState(false);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			})
		);
	}

	const AccountDropDown = useCallback(
		() => (
			<Image
				onClick={() => setIsOpen((p) => !p)}
				tabIndex={0}
				src={user?.image ?? logo}
				alt={'my account'}
				width={40}
				height={40}
				className="rounded-full border btn btn-ghost h-[54px] w-[54px] p-0"
				quality={25}
				loader={({ src }) => src}
				unoptimized
			/>
		),
		[user, isOpen, setIsOpen]
	);

	return (
		<div
			className={twMerge([styles.TOPBAR.topbar, 'bg-transparent', className])}
		>
			{(showSearch && SearchComponent) || null}

			<FlexBox className="relative hidden sm:flex sm:h-full pt-5 sm:pt-0 self-start justify-start sm:items-center sm:justify-between shrink-0 flex-col sm:flex-row gap-5">
				<Link
					href={'/'}
					className={twMerge(
						'hidden sm:flex z-50 flex-row gap-x-4',
						styles.shadow.logoShadow
					)}
				>
					<GrasSignature className="text-inverse py-0 mb-0 leading-3">
						{t('gras')}
					</GrasSignature>
					{/* <Image
						alt="Gras"
						className="w-[36px] bg-inverse rounded-full"
						src={logo}
						quality={25}
					/> */}
				</Link>

				{user && (
					<>
						<AccountDropDown />
						<DropDown
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							ButtonComponent={() => <></>}
							items={<UserNavigation activePathname="" />}
							origin="right"
						/>
					</>
				)}
				{!user && (
					<FlexBox className="shrink-0">
						<Button
							className={twMerge(
								styles.BUTTON.highlight,
								'hover:border-light sm:text-light'
							)}
							size="sm"
							bg="transparent"
							hover="transparent"
							onClick={openLoginModal}
						>
							{t('sign-in')}
						</Button>
					</FlexBox>
				)}
			</FlexBox>
		</div>
	);
}

export default TopBar;
