import { type PropsWithChildren } from 'react';
import { View } from '@themed';

function Padding({ children }: PropsWithChildren) {
	return <View>{children}</View>;
}

export default Padding;
