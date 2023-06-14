//Modal.tsx
import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useOnClickOutside } from '../../hooks';
import CloseButton from '../button/CloseButton';
import { H6 } from '../Typography';

export type ModalProps = {
    children?: React.ReactNode;
    isModalOverlay?: boolean;
    modalVisible: boolean;
    onClose: () => void;
    className?: string | string[];
    description?: string;
    disableClickOutside?: boolean;
    showCloseButton?: boolean;
};

const Modal = ({
    children,
    isModalOverlay = true,
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
        modal: [isModalOverlay && 'modal', modalVisible && 'modal-open'],
        content: [
            'modal-box',
            'bg-inverse-soft'
        ],
        responsive: [
            'mx-auto',
            'rounded-none',
            // 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8'
        ]
    };
    return (
        <div className={twMerge(styles.modal)}>
            <div className={twMerge(styles.content, styles.responsive, className)} ref={ref}>
                {showCloseButton && <CloseButton onClick={onClose} />}
                {description && <H6 className={twMerge('pb-2')}>{description}</H6>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
