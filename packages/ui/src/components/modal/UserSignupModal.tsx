import { type ModalStateProps } from '../../../../core/src/reducer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '../button';
import Modal from './Modal2';

type UserSignupModalProps = ModalStateProps;

const UserSignupModal = ({ ...props }: UserSignupModalProps) => {
	const t = useTranslations('common');

	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(props.modalVisible);
	}, [props.modalVisible]);

	const closeModalAndReset = () => {
		setOpenModal(false);
		props.dispatchCloseModal();
	};

	return props.modalVisible ? (
		<Modal open={openModal} close={closeModalAndReset}>
			<Modal.Header>{props.modalText}</Modal.Header>
			<Modal.Body className="text-sm leading-6 flex flex-col text-center gap-y-2">
				Sign up today
			</Modal.Body>
			<Modal.Footer className="justify-center pt-2">
				<Button
					type="button"
					className="px-6 self-center font-bold transition-50 hover:scale-102 bg-secondary-light hover:bg-primary-light active:bg-primary-light"
				>
					{t('close')}
				</Button>
			</Modal.Footer>
		</Modal>
	) : null;
};

export default UserSignupModal;
