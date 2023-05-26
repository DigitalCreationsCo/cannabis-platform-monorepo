//Modal.tsx
import { RNstyles } from '@cd/core-lib';
import React, { useRef } from 'react';
import { View } from 'react-native';
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

    return (
        <View className={twMerge(
            RNstyles.modal.modalClass, 
            RNstyles.modal.isModalOpen_f(modalVisible))}>
            <View className={twMerge(RNstyles.modal.modalBox, className)} ref={ref}>
                {showCloseButton && <CloseButton onPress={onClose} />}
                <H6 className={twMerge('pb-2')}>{description}</H6>
                {children}
            </View>
        </View>
    );
};

export default Modal;
