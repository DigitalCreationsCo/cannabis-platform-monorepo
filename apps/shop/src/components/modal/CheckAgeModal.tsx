import { Modal } from '@cd/ui-lib';
import CheckAge from 'components/CheckAge';
import { twMerge } from 'tailwind-merge';

interface CheckAgeModalProps {
    dispatchCloseModal: () => void;
    modalVisible: boolean;
}

function CheckAgeModal({ dispatchCloseModal, modalVisible, ...props }: CheckAgeModalProps) {
    
    const closeModalAndReset = () => {
        dispatchCloseModal();
    };

    return (
        <Modal
        disableClickOutside
        className={twMerge(styles.responsive)} 
        modalVisible={modalVisible} 
        onClose={dispatchCloseModal} 
        {...props}>
            <CheckAge onContinue={closeModalAndReset} redirect='/browse'/>
        </Modal>
    );
}

export default CheckAgeModal;

const styles = {
    responsive: 'min-w-full sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8'
};
