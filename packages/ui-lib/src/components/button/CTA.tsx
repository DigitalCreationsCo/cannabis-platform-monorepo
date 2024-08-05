import { TextContent } from '@cd/core-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

const CTA = ({
	className,
	cta,
	href = '#get-started',
	secondary = false,
}: {
	className?: any;
	cta?: any;
	href?: string;
	secondary?: boolean;
}) => {
	return (
		<Link
			href={href}
			scroll={false}
			className={twMerge('w-[420px] transition duration-200 mb-2', className)}
		>
			<Button
				size="lg"
				bg={secondary ? 'transparent' : 'secondary-light'}
				hover={secondary ? 'transparent' : 'primary'}
				className={twMerge(
					'w-full uppercase px-8',
					'hover:-translate-y-1',
					secondary ? 'border-[3px] border-secondary-light ' : 'font-black',
					secondary
						? 'hover:bg-secondary-light hover:scale-102'
						: 'hover:scale-105'
				)}
			>
				{secondary
					? cta || TextContent.info.LEARN_MORE
					: cta || `2X My Business`}
			</Button>
		</Link>
	);
};

export default CTA;
