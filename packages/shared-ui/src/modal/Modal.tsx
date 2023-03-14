//Modal.tsx
import { H6 } from '../Typography';
// import { useOnClickOutside } from 'hooks';
import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import CloseButton from '../CloseButton';

export type ModalProps = {
    children?: React.ReactNode;
    open: boolean;
    onClose: any;
    className?: string;
    description?: string;
    disableClickOutside?: boolean;
    showCloseButton?: boolean;
};

const Modal = ({
    children,
    open,
    disableClickOutside = !open,
    onClose,
    description,
    className,
    showCloseButton = true
}: ModalProps) => {
    // const { setModalOpen } = useModal();
    const ref = useRef(null);
    // useOnClickOutside(ref, () => {
    //     if (!disableClickOutside) {
    //         onClose();
    //         setModalOpen(false);
    //     }
    // });

    const modalClass = ['modal', open && 'modal-open'];
    return (
        <div className={twMerge(modalClass)}>
            <div className={twMerge('modal-box rounded-btn bg-inverse-soft', className)} ref={ref}>
                {showCloseButton && <CloseButton onClick={onClose} />}
                <H6 className={twMerge('pb-2')}>{description}</H6>
                {children}
            </div>
        </div>
    );
};

export default Modal;
