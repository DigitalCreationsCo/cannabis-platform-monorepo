import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexBox from '../FlexBox';
import TextField from '../TextField';
import Modal from './Modal';

interface EmailModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

function EmailModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: EmailModalProps) {
	const closeModal = () => {
		dispatchCloseModal();
	};
	const styles = {
		emailModal: ['absolute', 'm-12', 'top-0 right-0 border-2 z-10'],
	};
	const [email, setEmail] = useState('');
	return (
		<Modal
			isModalOverlay={false}
			modalVisible={modalVisible}
			onClose={closeModal}
			{...props}
			className={twMerge(styles.emailModal)}
		>
			<FlexBox>Email Modal</FlexBox>
			<TextField onChange={(e: any) => setEmail(e.target.value)} />
			send an email to {email}
		</Modal>
	);
}

export default EmailModal;
