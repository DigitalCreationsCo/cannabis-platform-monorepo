import { twMerge } from 'tailwind-merge';
import Center from '../Center';
import { H2, Paragraph } from '../Typography';
import Modal from './Modal';

interface NewDealModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

function NewDealModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: NewDealModalProps) {
	const closeModalAndReset = () => {
		dispatchCloseModal();
	};

	async function onSubmit() {
		closeModalAndReset();
	}

	return (
		<Modal
			disableClickOutside
			className={twMerge(styles.responsive, 'flex flex-col')}
			modalVisible={modalVisible}
			onClose={dispatchCloseModal}
			{...props}
		>
			<Center className="w-3/4 m-auto pb-8">
				<H2>Create a daily deal</H2>
				<Paragraph>form here</Paragraph>
			</Center>
		</Modal>
	);
}

export default NewDealModal;

const styles = {
	responsive:
		'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8',
};
