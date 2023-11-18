import { SafeAreaView } from 'react-native-safe-area-context';

function Screen(Component: any) {
	const _Component = () => {
		return (
			<SafeAreaView>
				<Component />
			</SafeAreaView>
		);
	};
	_Component.displayName = `Screen-(${Component.name})`;
	return _Component;
}
export default Screen;
