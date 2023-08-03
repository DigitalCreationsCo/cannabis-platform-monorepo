import { RNstyles } from '@cd/core-lib/src/constants';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { H4, H5 } from '../Typography';

type CardProps = {
	className?: string;
	title?: string;
	amount?: string | number;
};

function Card({
	className,
	title,
	amount,
	children,
}: CardProps & PropsWithChildren) {
	return (
		<View className={twMerge(RNstyles.card.container, className)}>
			{title && <H5 className="whitespace-pre">{title}</H5>}
			{amount !== undefined && <H4>{amount}</H4>}
			{children}
		</View>
	);
}

export default Card;
