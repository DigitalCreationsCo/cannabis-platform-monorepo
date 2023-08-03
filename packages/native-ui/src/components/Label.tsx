import { PropsWithChildren } from 'react';
import { Text } from 'react-native';

function Label({ children }: PropsWithChildren) {
	return <Text>{children}</Text>;
}

export default Label;
