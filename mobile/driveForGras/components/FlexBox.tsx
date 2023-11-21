import { type PropsWithChildren } from 'react';
import { View } from '@components';

const FlexBox = ({ children }: { className?: string } & PropsWithChildren) => (
	<View>{children}</View>
);

export default FlexBox;
