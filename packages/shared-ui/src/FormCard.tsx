import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import FlexBox from './FlexBox';
import { H6 } from './Typography';

type FormCardProps = {
    currentStep?: number;
    totalSteps?: number;
    className?: string;
} & PropsWithChildren;
function FormCard({ currentStep, totalSteps, className, children }: FormCardProps) {
    const styles = { pageNumber: 'fixed bottom-0 right-0 p-12' };
    return (
        <Card className={twMerge('bg-inverse', className)}>
            {children}
            <FlexBox className={styles.pageNumber}>{currentStep && <H6>{currentStep + 1}</H6>}</FlexBox>
        </Card>
    );
}

export default FormCard;
