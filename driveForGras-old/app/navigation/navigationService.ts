import { createNavigationContainerRef } from '@react-navigation/native';

type RootStackParamList = Record<string, object | undefined>;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (routename: any, params: any) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(routename, params);
	}
};

const goBack = () => {
	if (navigationRef.isReady()) navigationRef.goBack();
};

export default {
	navigate,
	goBack,
};
