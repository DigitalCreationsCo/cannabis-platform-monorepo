import { ReactNode } from 'react';
import Button from '../button/Button';
import FlexBox from '../FlexBox';
import Modal, { ModalProps } from './Modal';

interface ConfirmationModalProps extends ModalProps {
	confirmMessage?: string;
	handleConfirm: () => void;
	children?: ReactNode;
}

function ConfirmationModal({
	description = 'Confirm?',
	confirmMessage = 'Yes',
	handleConfirm,
	children,
	...props
}: ConfirmationModalProps) {
	return (
		<Modal {...props} className="text-center" description={description}>
			<FlexBox className="flex-col space-y-4">
				{children}
				<FlexBox className="justify-center">
					<Button className="" onPress={props.onClose}>
						No
					</Button>
					<Button
						className=""
						onPress={() => {
							handleConfirm();
							props.onClose();
						}}
					>
						{confirmMessage}
					</Button>
				</FlexBox>
			</FlexBox>
		</Modal>
	);
}

export default ConfirmationModal;
