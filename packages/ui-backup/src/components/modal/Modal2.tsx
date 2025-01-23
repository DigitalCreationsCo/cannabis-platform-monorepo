import { useTranslations } from 'next-intl';
import { Modal as DModal } from 'react-daisyui';
import { twMerge } from 'tailwind-merge';
import CloseButton from '../button/CloseButton';
import { H3, Paragraph } from '../Typography';

interface ModalProps {
	open: boolean;
	close: () => void;
	children: React.ReactNode;
}

interface BodyProps {
	children: React.ReactNode;
	className?: string;
}

const Modal = ({ open, close, children }: ModalProps) => {
	const t = useTranslations('common');

	return (
		<DModal open={open} className="dark:border dark:border-gray-100">
			<CloseButton onClick={close} aria-label="close" />
			<div>{children}</div>
		</DModal>
	);
};

const Header = ({ children }: { children: React.ReactNode }) => {
	return <H3 className="text-xl">{children}</H3>;
};

const Description = ({ children }: { children: React.ReactNode }) => {
	return (
		<Paragraph className="text-sm text-gray-700 pt-1">{children}</Paragraph>
	);
};

const Body = ({ children, className }: BodyProps) => {
	return <div className={`py-3 ${className}`}>{children}</div>;
};

const Footer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string | string[];
}) => {
	return (
		<div className={twMerge('flex justify-end gap-2', className)}>
			{children}
		</div>
	);
};

Modal.Header = Header;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
