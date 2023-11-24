import { type PropsWithChildren } from 'react';
import { styles } from '../../styles';
import { View } from '../Themed';

function Center(props: PropsWithChildren) {
	return <View style={styles.view.center}>{props.children}</View>;
}

export default Center;
