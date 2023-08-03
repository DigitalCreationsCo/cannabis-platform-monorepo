import {
	toast,
	Toasts,
	useToasterStore,
} from '@backpackapp-io/react-native-toast';
import { useEffect } from 'react';

const NativeToastProvider = () => {
	const TOAST_LIMIT = 2;
	const { toasts } = useToasterStore();
	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= TOAST_LIMIT)
			.filter((t) => toast.dismiss(t.id));
		// .map((t) => t.customToast = (toast) => (<View><Text>hello</Text></View>))
	}, [toasts]);

	return <Toasts />;
};

export { NativeToastProvider };
