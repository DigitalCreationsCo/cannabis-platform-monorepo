import { TextContent } from '../../../../core/src/constants';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

const CTA = ({
	className,
	cta,
	href = '#get-started',
	secondary = false,
	loading = false,
}: {
	className?: any;
	cta?: any;
	href?: string;
	secondary?: boolean;
	loading?: boolean;
}) => {
	return (
		<Link
			href={href}
			scroll={false}
			className={twMerge(
				'max-w-[420px] transition duration-200 mb-2',
				className
			)}
		>
			<Button
				loading={loading}
				size="lg"
				bg={secondary ? 'transparent' : 'secondary-light'}
				hover={secondary ? 'transparent' : 'primary'}
				className={twMerge(
					'w-full px-8',
					'hover:-translate-y-1',
					secondary ? 'border-[3px] border-secondary-light ' : 'font-black',
					secondary
						? 'hover:bg-secondary-light hover:scale-102'
						: 'hover:bg-primary hover:scale-105'
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
