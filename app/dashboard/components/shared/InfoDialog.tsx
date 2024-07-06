import { Button, Modal2 as Modal } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';

interface InfoDialogProps {
	title: string;
	visible: boolean;
	onCancel: () => void;
	onConfirm?: () => any;
	confirmText?: string | any;
	children: React.ReactNode;
}

const InfoDialog = ({
	title,
	children,
	visible,
	onConfirm,
	onCancel,
	confirmText,
}: InfoDialogProps) => {
	const { t } = useTranslation('common');

	const handleConfirm = async () => {
		if (onConfirm) onConfirm();
		onCancel();
	};

	return (
		<Modal open={visible} close={onCancel}>
			<Modal.Header>{title}</Modal.Header>
			<Modal.Body className="text-sm leading-6 flex flex-col text-center gap-y-2">
				{children}
			</Modal.Body>
			<Modal.Footer className="justify-center pt-2">
				<Button
					type="button"
					className="px-6 self-center font-bold transition-50 hover:scale-102 bg-secondary-light hover:bg-primary-light active:bg-primary-light"
					onClick={handleConfirm}
				>
					{confirmText || t('close')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default InfoDialog;
