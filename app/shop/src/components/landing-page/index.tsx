/* eslint-disable import/no-cycle */
import { Button } from '@cd/ui-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export { default as ServicesTopBar } from './ServicesTopBar';
export { default as Hero } from './Hero';
export { default as ContactUs } from './ContactUs';
export { default as Benefits } from './benefits/Benefits';
export { default as Letter } from './letter/Letter';

export const CTA2XMyBusiness = ({
	className,
	cta,
}: {
	className?: any;
	cta?: any;
}) => {
	return (
		<Link
			href={'#contact-us-header'}
			scroll={false}
			className={twMerge(
				'min-w-[240px] hover:scale-105 transition duration-200 pb-2',
				className,
			)}
		>
			<Button
				size="lg"
				bg="secondary-light"
				hover="primary"
				className="w-full uppercase font-black px-8"
			>
				{cta || `2X My Business`}
			</Button>
		</Link>
	);
};
