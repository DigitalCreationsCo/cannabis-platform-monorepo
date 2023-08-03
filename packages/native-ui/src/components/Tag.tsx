import { PropsWithChildren, SVGAttributes } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import IconWrapper from './IconWrapper';
import { Small } from './Typography';

function Tag({ Icon, onClick, children }: TagProps) {
	return (
		<View
			onResponderStart={onClick}
			className="cursor-default badge badge-primary m-2 gap-2 w-[112px]"
		>
			<Small>{children}</Small>
			{Icon && <IconWrapper Icon={Icon} className="fill-light" size={11} />}
		</View>
	);
}

export default Tag;

type TagProps = {
	Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | null;
	onClick?: (event: GestureResponderEvent) => void;
} & PropsWithChildren;
