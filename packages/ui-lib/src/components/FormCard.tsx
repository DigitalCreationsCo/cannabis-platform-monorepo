import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import FlexBox from './FlexBox';

type FormCardProps = {
    currentStep?: number;
    totalSteps?: number;
    className?: string;
} & PropsWithChildren;
function FormCard({ currentStep, totalSteps, className, children }: FormCardProps) {

    const
    showStepNumber = currentStep !== undefined && totalSteps !== undefined 
    && `step ${currentStep + 1} of ${totalSteps}`
    return (
        <Card className={twMerge('bg-inverse', className)}>
            <FlexBox className={styles.pageNumber}>
                {showStepNumber}
            </FlexBox>
            {children}
        </Card>
    );
}

export default FormCard;

const styles = { 
    pageNumber: 'fixed bottom-0 right-0 p-12 cursor-default'
};