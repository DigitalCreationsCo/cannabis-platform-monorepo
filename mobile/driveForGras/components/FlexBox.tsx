import { type PropsWithChildren } from 'react';
import { View } from '@themed';

const FlexBox = ({ children }: { className?: string } & PropsWithChildren) => (
	<View>{children}</View>
);

export default FlexBox;
