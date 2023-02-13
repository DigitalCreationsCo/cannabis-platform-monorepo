//Modal.tsx
import { H6 } from '@cd/shared-ui';
import { useOnClickOutside } from 'hooks';
import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useModal } from '../../context';

export type ModalProps = {
    children?: React.ReactNode;
    open: boolean;
    onClose: any;
    className?: string;
    description?: string;
    disableClickOutside?: boolean;
};

const Modal = ({ children, open, disableClickOutside = !open, onClose, description, className }: ModalProps) => {
    const { setModalOpen } = useModal();
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        if (!disableClickOutside) {
            onClose();
            setModalOpen(false);
        }
    });
    useEffect(() => {
        if (open) setModalOpen(true);
    }, [open, setModalOpen]);
    const modalClass = ['modal', open && 'modal-open'];
    return (
        <div className={twMerge(modalClass)}>
            <div className={twMerge('modal-box rounded-btn bg-inverse-soft', className)} ref={ref}>
                <H6 className={twMerge('pb-2')}>{description}</H6>
                {children}
            </div>
        </div>
    );
};

export default Modal;
