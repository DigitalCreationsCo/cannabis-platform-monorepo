import { type PropsWithChildren } from 'react';
import { View } from './Themed';

const FlexBox = ({ children }: { className?: string } & PropsWithChildren) => (
	<View>{children}</View>
);

export default FlexBox;
