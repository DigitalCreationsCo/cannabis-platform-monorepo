import { Card, FlexBox, Paragraph } from '@cd/shared-ui';
import { PropsWithChildren } from 'react';

type FormCardProps = {
    currentStep: number;
    totalSteps: number;
    className?: string;
} & PropsWithChildren;
function FormCard({ currentStep, totalSteps, className, children }: FormCardProps) {
    return (
        <Card className={className}>
            <FlexBox>
                <Paragraph>
                    Page {currentStep + 1} of {totalSteps}
                </Paragraph>
            </FlexBox>
            {children}
        </Card>
    );
}

export default FormCard;
