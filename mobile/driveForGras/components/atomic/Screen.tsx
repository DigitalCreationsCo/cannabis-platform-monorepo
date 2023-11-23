import { styles } from '@styles';
import { SafeAreaView } from '../Themed';

const Screen = (Component: any) => {
	const _C = () => (
		<SafeAreaView style={styles.view.container}>
			<Component />
		</SafeAreaView>
	);
	_C.displayName = `Screen-Component-${Component.displayName}`;
	return _C;
};
export default Screen;
