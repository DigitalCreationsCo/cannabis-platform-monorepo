import { SafeAreaView } from 'react-native-safe-area-context';

function Screen(Component: any) {
	return () => {
		return (
			<SafeAreaView className="bg-primary flex-1 h-full">
				<Component />
			</SafeAreaView>
		);
	};
}
export default Screen;
