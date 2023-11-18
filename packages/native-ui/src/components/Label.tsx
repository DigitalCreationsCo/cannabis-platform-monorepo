import { type PropsWithChildren } from 'react';
import { Text } from '@themed';

function Label({ children }: PropsWithChildren) {
	return <Text>{children}</Text>;
}

export default Label;
