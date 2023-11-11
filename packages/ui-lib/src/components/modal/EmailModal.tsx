import { type ModalStateProps } from '@cd/core-lib';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import icons from '../../icons';
import { IconButton } from '../button';
import FlexBox from '../FlexBox';
import TextField from '../TextField';
import { Paragraph } from '../Typography';
import Modal from './Modal';

interface EmailModalProps extends ModalStateProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

function EmailModal({
	dispatchCloseModal,
	modalVisible,
	modalText,
	...props
}: EmailModalProps) {
	const closeModal = () => {
		dispatchCloseModal();
	};
	const styles = {
		emailModal: ['absolute', 'm-12', 'top-0 right-0 border-2 z-10'],
	};

	const [email, setEmail] = useState('support@grascannabis.org');
	const sendEmail = () => {
		modalText &&
			window.open(
				`mailto:${email}?subject=${'Install Delivery By Gras widget for customer deliveries'}&body=${modalText}`,
			);
	};

	return (
		<Modal
			isModalOverlay={true}
			modalVisible={modalVisible}
			onClose={closeModal}
			{...props}
			className={twMerge(styles.emailModal)}
		>
			<FlexBox>
				<Paragraph className="font-semibold">
					Get Help From A Developer
				</Paragraph>
				<Paragraph>Send an email to</Paragraph>
			</FlexBox>
			<form
				className="flex flex-row space-x-2 items-start"
				onSubmit={(e) => {
					e.preventDefault();
					sendEmail();
				}}
			>
				<TextField
					onChange={(e: any) => setEmail(e.target.value)}
					placeholder={'email'}
					value={email}
					containerClassName="w-[320px]"
				/>
				<IconButton
					Icon={icons.SendAltFilled}
					iconColor="primary"
					iconSize={28}
					transparent
					bg="transparent"
					hover="transparent"
					className="p-6 px-2"
					size="sm"
					onClick={sendEmail}
				/>
			</form>
		</Modal>
	);
}

export default EmailModal;
