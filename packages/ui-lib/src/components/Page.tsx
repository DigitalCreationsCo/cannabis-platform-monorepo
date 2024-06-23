import { CSSProperties, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import AnimationWrapper from './AnimationWrapper';

type PageProps = {
	gradient?: 'pink' | 'green';
	className?: string | string[];
	style?: CSSProperties;
};

function Page({
	gradient,
	children,
	className = '',
	style = {},
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
		<AnimationWrapper className="flex flex-col w-full min-h-screen">
			<div className={twMerge(classes, className)} style={style}>
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
