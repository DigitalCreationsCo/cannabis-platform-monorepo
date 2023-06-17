import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import CheckBox, { CheckBoxProps } from './CheckBox';
import FlexBox from './FlexBox';
import Label from './Label';

function TermsAgreement({ description, className, ...props }: { description?: ReactNode } & CheckBoxProps) {
    return (
        <FlexBox className={twMerge(["grow space-y-2 space-x-0 p-0", className])}>
            <Label>{description}</Label>
            <CheckBox {...props} />
        </FlexBox>
    );
}

export default TermsAgreement;
