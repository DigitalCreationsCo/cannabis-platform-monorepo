// Modal.tsx
import Image from 'next/image';
import React, { useCallback, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useOnClickOutside, useScrollLock } from '../../hooks';
import CloseButton from '../button/CloseButton';
import { H6 } from '../Typography';

export interface ModalProps {
	children?: React.ReactNode;
	isModalOverlay?: boolean;
	modalVisible: boolean;
	onClose: () => void;
	className?: string | string[];
	description?: string;
	disableClickOutside?: boolean;
	showCloseButton?: boolean;
	backdrop?: string;
	alt?: string;
}

const Modal = ({
	children,
	isModalOverlay = true,
	modalVisible,
	disableClickOutside = !modalVisible,
	onClose,
	description,
	className,
	showCloseButton = true,
	backdrop,
	alt,
}: ModalProps) => {
	const ref = useRef(null);
	useScrollLock();
	useOnClickOutside(ref, () => {
		if (!disableClickOutside) {
			onClose();
		}
	});

	const styles = {
		modal: [isModalOverlay && 'modal', modalVisible && 'modal-open'],
		content: ['modal-box', 'bg-inverse-soft'],
		responsive: [
			'mx-auto',
			'rounded-none',
			// 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8'
		],
	};

	const ImageBackdrop = useCallback(() => {
		return (
			(backdrop && (
				<div className="absolute bg-secondary w-full h-full -z-20">
					<Image
						className="opacity-50 absolute w-full h-full object-cover"
						src={backdrop}
						alt={alt || ''}
					/>
				</div>
			)) ||
			null
		);
	}, [backdrop, alt]);

	return (
		<div className={twMerge(styles.modal)}>
			<div
				className={twMerge(styles.content, styles.responsive, className)}
				ref={ref}
			>
				<ImageBackdrop />
				{showCloseButton && <CloseButton iconSize={28} onClick={onClose} />}
				{description && <H6 className={twMerge('pb-2')}>{description}</H6>}
				{children}
			</div>
		</div>
	);
};

export default Modal;
