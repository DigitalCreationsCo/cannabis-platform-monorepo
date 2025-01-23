"use client"
import { useEffect } from 'react';
import {
	toast,
	Toaster,
	useToasterStore,
	type ToastOptions,
} from 'react-hot-toast';

const ToastProvider = ({ toastOptions }: { toastOptions?: ToastOptions }) => {
	const TOAST_LIMIT = 2;
	const { toasts } = useToasterStore();
	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= TOAST_LIMIT)
			.forEach((t) => toast.dismiss(t.id));
	}, [toasts]);

	return (
		<Toaster
			position="top-center"
			toastOptions={{ duration: 2000 }}
			{...toastOptions}
		/>
	);
};

export { ToastProvider };
