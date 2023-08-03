import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

const ToastProvider = () => {
	const TOAST_LIMIT = 2;
	const { toasts } = useToasterStore();
	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= TOAST_LIMIT)
			.forEach((t) => toast.dismiss(t.id));
	}, [toasts]);

	return <Toaster position="top-center" toastOptions={{ duration: 2000 }} />;
};

export { ToastProvider };
