import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

function Row({
	className,
	children,
}: { className?: string } & PropsWithChildren) {
	return (
		<Card
			className={twMerge(
				'flex flex-row px-1 !py-0 justify-between items-center space-x-2 md:space-x-4 md:!w-full lg:!w-full',
				className
			)}
		>
			{children}
		</Card>
	);
}

export default Row;
