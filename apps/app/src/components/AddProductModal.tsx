import { FlexBox } from '@cd/shared-ui';
import Modal, { ModalProps } from './Modal';

function AddProduct({ children, ...props }: ModalProps) {
    return (
        <Modal className="flex flex-col h-3/4 lg:min-w-[800px]" {...props}>
            <FlexBox className="space-y-6 space-x-0 basis-5/6 flex-col items-stretch">{children}</FlexBox>
        </Modal>
    );
}

export default AddProduct;
