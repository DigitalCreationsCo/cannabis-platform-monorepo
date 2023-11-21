import { type PropsWithChildren } from 'react';
import { View } from '@components';

function Center({ children }: { className?: string } & PropsWithChildren) {
	return <View>{children}</View>;
}

export default Center;
