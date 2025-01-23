"use client"
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
	useCallback,
	useEffect,
	useState,
	type CSSProperties,
	type PropsWithChildren,
} from 'react';
// import AnimationWrapper from './AnimationWrapper';
import { Button } from './button';
import DropDown from './DropDown';
import FlexBox from './FlexBox';

function Page(props: any) {
	const t = useTranslations('common');
	const router = useRouter();
	const asPath = usePathname();

	const classes = Object.values({
		page: [
			'p-2',
			'bg-inverse-soft',
			'flex flex-col grow',
			'lg:pt-8 pb-24',
			'lg:px-16',
			'min-h-[440px]',
		],
		gradient: [
			(props.gradient && 'anim8-' + props.gradient + '-gradient') || '',
			'animate-gradient',
		],
		cursor: ['cursor-default'],
		// hideOverflow: ['overflow-hidden'],
	});

	const [showBottomTab, setShowBottomTab] = useState(true);
	const [showButtonDrawer, setShowButtonDrawer] = useState(false);
	const [activePathname, setActivePathname] = useState<null | string>(null);

	useEffect(() => {
		if (asPath) {
			const activePathname = new URL(asPath, location.href).pathname;
			setActivePathname(activePathname);
		}
	}, [asPath]);

	return (
		// <AnimationWrapper
		// 	style={style}
		// 	className={twMerge(
		// 		classes,
		// 		'flex flex-col w-full min-h-screen',
		// 		className
		// 	)}
		// 	{...props}
		// >
		<div>
			{props.children}
		</div>
		// </AnimationWrapper>
	);
}

export default Page;
