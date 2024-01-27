import { useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { styles } from '../../../styleClassNames';
import Modal from '../Modal';
import EnterPasscode from './EnterPassCodeForm';
import LoginModalHeader from './LoginModalHeader';
import SendPasscode from './SendPassCodeForm';

interface LoginModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

export default function LoginModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: LoginModalProps) {
	const [formStep, setFormStep] = useState(0);

	const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
	const nextFormStep = () =>
		setFormStep((currentStep) =>
			currentStep <= 1 ? currentStep + 1 : currentStep,
		);

	const FormStepComponents: (({
		prevFormStep,
		nextFormStep,
	}: LoginFormComponentProps) => JSX.Element)[] = [SendPasscode, EnterPasscode];

	const FormStepComponent = useMemo(
		() => FormStepComponents[formStep],
		[formStep],
	);

	const [inputValue, setInputValue] = useState('');

	const closeModalAndReset = () => {
		setOpenModal(false);
		setFormStep(0);
		dispatchCloseModal();
	};

	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	return modalVisible ? (
		<Modal
			className={twMerge(styles.responsiveContainer, styles.padd)}
			modalVisible={openModal}
			onClose={closeModalAndReset}
			{...props}
		>
			<div className="flex flex-col m-0 p-0 min-h-[400px]">
				<LoginModalHeader />
				<div className="flex self-center justify-center items-center mx-auto w-full grow">
					<FormStepComponent
						prevFormStep={prevFormStep}
						nextFormStep={nextFormStep}
						inputValue={inputValue}
						setInputValue={setInputValue}
						dispatchCloseModal={dispatchCloseModal}
					/>
				</div>
			</div>
		</Modal>
	) : (
		<></>
	);
}

export interface LoginFormComponentProps {
	prevFormStep: () => void;
	nextFormStep: () => void;
	inputValue: string;
	setInputValue: (value: string) => void;
	dispatchCloseModal: () => void;
}
