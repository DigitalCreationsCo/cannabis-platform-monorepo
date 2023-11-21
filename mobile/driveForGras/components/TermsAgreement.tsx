import { type ReactNode } from 'react';
import { FlexBox, Label, CheckBox, type CheckBoxProps } from '@components';

function TermsAgreement({
	description,
	...props
}: { description?: ReactNode } & CheckBoxProps) {
	return (
		<FlexBox className="grow space-y-2 space-x-0 p-0">
			<Label>{description}</Label>
			<CheckBox {...props} name={props.name} onChange={props.onChange} />
		</FlexBox>
	);
}

export default TermsAgreement;
