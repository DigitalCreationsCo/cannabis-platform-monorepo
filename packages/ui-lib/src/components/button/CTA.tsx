import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

const CTA = ({
	className,
	cta,
	href = '#get-started',
}: {
	className?: any;
	cta?: any;
	href?: string;
}) => {
	return (
		<Link
			href={href}
			scroll={false}
			className={twMerge(
				'min-w-[240px] hover:scale-105 transition duration-200 pb-2',
				className
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

export default CTA;
