import { ReactNode } from 'react';
import CheckBox, { CheckBoxProps } from './CheckBox';
import FlexBox from './FlexBox';
import Label from './Label';

function TermsAgreement({ description, ...props }: { description?: ReactNode } & CheckBoxProps) {
    return (
        <FlexBox className="grow space-y-2 space-x-0 p-0">
            <Label>{description}</Label>
            <CheckBox {...props} />
        </FlexBox>
    );
}

export default TermsAgreement;
