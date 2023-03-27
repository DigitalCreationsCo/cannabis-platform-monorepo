//Modal.tsx
import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import CloseButton from '../CloseButton';
import { useOnClickOutside } from '../hooks';
import { H6 } from '../Typography';

export type ModalProps = {
    children?: React.ReactNode;
    modalVisible: boolean;
    onClose: () => void;
    className?: string;
    description?: string;
    disableClickOutside?: boolean;
    showCloseButton?: boolean;
};

const Modal = ({
    children,
    modalVisible,
    disableClickOutside = !modalVisible,
    onClose,
    description,
    className,
    showCloseButton = true
}: ModalProps) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        if (!disableClickOutside) {
            onClose();
        }
    });

    const styles = {
        modalClass: ['modal', modalVisible && 'modal-open'],
        responsive: 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8'
    };
    return (
        <div className={twMerge(styles.modalClass)}>
            <div className={twMerge('modal-box rounded-btn bg-inverse-soft', className)} ref={ref}>
                {showCloseButton && <CloseButton onClick={onClose} />}
                <H6 className={twMerge('pb-2')}>{description}</H6>
                {children}
            </div>
        </div>
    );
};

export default Modal;
