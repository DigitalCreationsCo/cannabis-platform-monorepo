import { type PropsWithChildren } from 'react';
import { View } from '@themed';

function Center({ children }: { className?: string } & PropsWithChildren) {
	return <View>{children}</View>;
}

export default Center;
