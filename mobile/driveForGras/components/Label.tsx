import { type PropsWithChildren } from 'react';
import { Text } from '@components';

function Label({ children }: PropsWithChildren) {
	return <Text>{children}</Text>;
}

export default Label;
