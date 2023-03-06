import { Button, FlexBox } from '@cd/shared-ui';
import Modal, { ModalProps } from '@cd/shared-ui/src/modal/Modal';
import { ReactNode } from 'react';

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
                    <Button className="" onClick={props.onClose}>
                        No
                    </Button>
                    <Button
                        className=""
                        onClick={() => {
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
