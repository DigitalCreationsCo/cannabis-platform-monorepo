import { Button } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import Modal from './Modal';

interface UpgradeAccountDialogProps {
	title: string;
	visible: boolean;
	onCancel: () => void;
	onConfirm: () => any;
	confirmText?: string | any;
	children: React.ReactNode;
}

const UpgradeAccountDialog = ({
	title,
	children,
	visible,
	onConfirm,
	onCancel,
	confirmText,
}: UpgradeAccountDialogProps) => {
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
					{confirmText || t('upgrade-my-account')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default UpgradeAccountDialog;
