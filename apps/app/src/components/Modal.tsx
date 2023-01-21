//Modal.tsx
import { H6 } from '@cd/shared-ui';
import { useOnClickOutside } from 'hooks';
import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ModalProps = {
    children?: React.ReactNode;
    open: boolean;
    onClose: any;
    className?: string;
    description?: string;
    disableClickOutside?: boolean;
};

const Modal = ({ children, open, disableClickOutside = !open, onClose, description, className }: ModalProps) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        if (!disableClickOutside) {
            onClose();
        }
    });
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
