import { Card, FlexBox, H6 } from '@cd/shared-ui';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type FormCardProps = {
    currentStep: number;
    totalSteps: number;
    className?: string;
} & PropsWithChildren;
function FormCard({ currentStep, totalSteps, className, children }: FormCardProps) {
    const styles = { pageNumber: 'fixed bottom-0 right-0 p-12' };
    return (
        <Card className={twMerge(className)}>
            {children}
            <FlexBox className={styles.pageNumber}>
                <H6>{currentStep + 1}</H6>
            </FlexBox>
        </Card>
    );
}

export default FormCard;
