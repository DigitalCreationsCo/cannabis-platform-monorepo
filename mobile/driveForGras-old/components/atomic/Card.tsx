import { type PropsWithChildren } from 'react';
import { Text, View } from '../Themed';

type CardProps = {
	title?: string;
	amount?: string | number;
};

function Card({ title, amount, children }: CardProps & PropsWithChildren) {
	return (
		<View>
			{title && <Text>{title}</Text>}
			{amount !== undefined && <Text>{amount}</Text>}
			{children}
		</View>
	);
}

export default Card;
