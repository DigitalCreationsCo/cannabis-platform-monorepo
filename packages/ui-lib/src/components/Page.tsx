import { modalActions } from '@cd/core-lib/reducer';
import { modalTypes } from '@cd/core-lib/types';
import { HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { type SessionContextValue } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
	useCallback,
	useEffect,
	useState,
	type CSSProperties,
	type PropsWithChildren,
} from 'react';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import AnimationWrapper from './AnimationWrapper';
import { Button } from './button';
import DropDown from './DropDown';
import FlexBox from './FlexBox';

interface PageProps {
	id?: string;
	gradient?: 'pink' | 'green' | 'neon';
	className?: string | string[];
	style?: CSSProperties;
	status?: SessionContextValue['status'];
	Navigation?: (a: any) => any;
}

// TRACK PAGE VIEWS ON PAGE LOAD, AND TRACK EXITS ON PAGE UNLOAD

function Page({
	status,
	gradient,
	children,
	className = '',
	style = {},
	Navigation,
	...props
}: PropsWithChildren<PageProps>) {
	// const appVersion = '0.1.0';

	const { t } = useTranslation('common');
	const router = useRouter();
	const { asPath, isReady } = useRouter();

	const dispatch = useDispatch();

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			})
		);
	}

	const memoizedCloseModal = useCallback(modalActions.closeModal, []);

	useEffect(() => {
		// close modal on page unmount
		return () => {
			dispatch(memoizedCloseModal());
		};
	}, [dispatch, memoizedCloseModal]);

	type Styles = (string | string[])[];
	const classes: Styles = Object.values({
		page: [
			'p-2',
			'bg-inverse-soft',
			'flex flex-col grow',
			'lg:pt-8 pb-24',
			'lg:px-16',
			'min-h-[440px]',
		],
		gradient: [
			(gradient && 'anim8-' + gradient + '-gradient') || '',
			'animate-gradient',
		],
		cursor: ['cursor-default'],
		// hideOverflow: ['overflow-hidden'],
		className,
	});

	const [showBottomTab, setShowBottomTab] = useState(true);
	const [showButtonDrawer, setShowButtonDrawer] = useState(false);
	const [activePathname, setActivePathname] = useState<null | string>(null);

	useEffect(() => {
		if (isReady && asPath) {
			const activePathname = new URL(asPath, location.href).pathname;
			setActivePathname(activePathname);
		}
	}, [asPath, isReady]);

	const showBottomTabHandler = () =>
		status === 'unauthenticated'
			? openLoginModal()
			: setShowButtonDrawer(!showButtonDrawer);

	return (
		<AnimationWrapper
			style={style}
			className={twMerge(
				classes,
				'flex flex-col w-full min-h-screen',
				className
			)}
			{...props}
		>
			{children}
			{Navigation && (
				<div
					className={twMerge(
						'relative',
						'transition',
						'h-fit w-full',
						'grow text-light sm:hidden fixed bottom-0'
						// showBottomTab ? 'translate-y-0' : '-translate-y-20',
					)}
				>
					<div
						className={twMerge(
							'shadow',
							'h-2 w-full',
							(gradient && 'anim8-' + gradient + '-gradient') || '',
							'animate-gradient'
						)}
					></div>
					<FlexBox className="z-10 bg-secondary py-1.5 h-fit flex-row items-center px-8 gap-x-8 w-full">
						<Button
							className={twMerge(
								'p-1 m-0 w-fit min-h-fit h-fit',
								'btn btn-ghost',
								'text-light',
								(gradient && 'anim8-' + gradient + '-gradient') || '',
								'animate-gradient'
							)}
							size="sm"
							onClick={() => router.push('/')}
						>
							<HomeIcon className="text-light w-7 h-7" />
						</Button>

						<Button
							className={twMerge(
								'p-1 m-0 w-fit min-h-fit h-fit',
								'btn btn-ghost',
								'text-light',
								(gradient && 'anim8-' + gradient + '-gradient') || '',
								'animate-gradient'
							)}
							size="sm"
							onClick={showBottomTabHandler}
						>
							<UserCircleIcon className="text-light w-7 h-7" />
						</Button>
					</FlexBox>
					<DropDown
						openDirection="up"
						isOpen={showButtonDrawer}
						setIsOpen={setShowButtonDrawer}
						ButtonComponent={() => <></>}
						items={<Navigation activePathname={activePathname} />}
					/>
				</div>
			)}
			{/* <div className="fixed flex items-center bottom-0 right-0 cursor-default text-accent-soft space-x-1 pr-1">
					<div
						className={twMerge([
							'hidden',
							process.env.NEXT_PUBLIC_IS_LOCAL_BUILD == '1' &&
								'flex items-center',
						])}
					>
						<Tiny>localhost</Tiny>
					</div>
					<Tiny>{appVersion}</Tiny>
				</div> */}
		</AnimationWrapper>
	);
}

export default Page;
