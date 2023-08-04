import {
	toast,
	Toasts,
	useToaster,
	useToasterStore,
} from '@backpackapp-io/react-native-toast';
import { useEffect } from 'react';
// import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { View } from 'react-native';
import { Paragraph } from '../components/Typography';

const NativeToastProvider = () => {
	useToaster();
	const TOAST_LIMIT = 2;
	const { toasts } = useToasterStore();
	// useEffect(() => {
	//     toasts
	//         .filter((t) => t.visible)
	//         .filter((_, i) => i >= TOAST_LIMIT)
	//         .filter((t) => toast.dismiss(t.id))
	//         .forEach((t) => toast("", { customToast: (toast) => (
	//             <View className='bg-primary'>
	//               <Paragraph>{toast.message as any}</Paragraph>
	//             </View>
	//            ) }))
	//         // .forEach((t) => toast.dismiss(t.id));
	// }, []);

	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= TOAST_LIMIT)
			.filter((t) => toast.dismiss(t.id))
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.forEach((t: any) =>
				toast('', {
					customToast: (toast) => (
						<View className="bg-primary">
							<Paragraph>{toast.message as string}</Paragraph>
						</View>
					),
				}),
			);
	}, [toasts]);

	return <Toasts />;
};

export { NativeToastProvider };
