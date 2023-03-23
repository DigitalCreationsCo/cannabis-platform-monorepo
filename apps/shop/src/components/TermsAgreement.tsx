import { FlexBox, Label } from '@cd/shared-ui';
import CheckBox, { CheckBoxProps } from '../components/CheckBox';

function TermsAgreement({ description, ...props }: { description?: React.ReactNode } & CheckBoxProps) {
    return (
        <FlexBox className="grow space-y-2 space-x-0 p-0">
            <Label>{description}</Label>
            <CheckBox {...props} />
        </FlexBox>
    );
}

export default TermsAgreement;
