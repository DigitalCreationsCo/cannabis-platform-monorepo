import { modalActions, modalTypes } from '@cd/core-lib';
import { set } from 'date-fns';
import { useTranslation } from 'next-i18next';
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

interface PageProps {
	id?: string;
	gradient?: 'pink' | 'green' | 'neon';
	className?: string | string[];
	style?: CSSProperties;
	status?: string;
}

// TRACK PAGE VIEWS ON PAGE LOAD, AND TRACK EXITS ON PAGE UNLOAD

function Page({
	status,
	gradient,
	children,
	className = '',
	style = {},
	...props
}: PropsWithChildren<PageProps>) {
	// const appVersion = '0.1.0';
	const { t } = useTranslation('common');
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
			{status === 'unauthenticated' && (
				<div
					className={twMerge(
						// showBottomTab ? 'translate-y-0' : '-translate-y-20',
						'flex flex-row',
						'transition',
						'z-50 h-[44px] border-t text-light border-inverse items-center justify-center sm:hidden bg-secondary fixed w-full bottom-0'
					)}
				>
					<Button
						className={twMerge(
							// styles.BUTTON.highlight,
							'text-light',
							'hover:border-light sm:text-light underline'
						)}
						size="sm"
						bg="transparent"
						hover="transparent"
						onClick={openLoginModal}
					>
						{t('sign-in-to-your-account')}
					</Button>
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
