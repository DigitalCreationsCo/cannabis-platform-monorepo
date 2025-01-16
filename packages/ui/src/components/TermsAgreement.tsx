import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import CheckBox, { type CheckBoxProps } from './CheckBox';
import FlexBox from './FlexBox';
import Label from './Label';

interface TermsAgreementProps extends CheckBoxProps {
	description?: ReactNode;
}

function TermsAgreement({
	description,
	className,
	...props
}: TermsAgreementProps) {
	return (
		<FlexBox className={twMerge(['grow space-y-2 space-x-0 p-0', className])}>
			<Label>{description}</Label>
			<CheckBox {...props} />
		</FlexBox>
	);
}

export default TermsAgreement;
