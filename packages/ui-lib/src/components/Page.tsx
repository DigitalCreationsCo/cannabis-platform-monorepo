import { type CSSProperties, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import AnimationWrapper from './AnimationWrapper';

interface PageProps {
	id?: string;
	gradient?: 'pink' | 'green' | 'neon';
	className?: string | string[];
	style?: CSSProperties;
}

// TRACK PAGE VIEWS ON PAGE LOAD, AND TRACK EXITS ON PAGE UNLOAD

function Page({
	gradient,
	children,
	className = '',
	style = {},
	...props
}: PropsWithChildren<PageProps>) {
	// const appVersion = '0.1.0';

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
			className={twMerge(
				classes,
				'flex flex-col w-full min-h-screen',
				className
			)}
			{...props}
		>
			<div style={style}>
				{children}
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
			</div>
		</AnimationWrapper>
	);
}

export default Page;
