import { type PropsWithChildren } from 'react';
import { View } from '@components';

function Padding({ children }: PropsWithChildren) {
	return <View>{children}</View>;
}

export default Padding;
