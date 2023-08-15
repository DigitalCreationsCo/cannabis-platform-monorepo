import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { H4, H5 } from './Typography';

type CardProps = {
	className?: string;
	amountClassName?: string;
	title?: string;
	amount?: string | number;
};

function Card({
	className,
	amountClassName,
	title,
	amount,
	children,
}: CardProps & PropsWithChildren) {
	const styles = {
		cardContainer:
			'h-max w-full md:!w-5/6 lg:!w-2/3 bg-light flex flex-col shadow drop-shadow p-2 sm:pt-4 !pb-12 md:p-5 md:px-12 !rounded-none md:!rounded-btn',
	};
	return (
		<div className={twMerge(styles.cardContainer, className)}>
			{title && <H5 className="whitespace-pre">{title}</H5>}
			{amount !== undefined && <H4 className={amountClassName}>{amount}</H4>}
			{children}
		</div>
	);
}

export default Card;
