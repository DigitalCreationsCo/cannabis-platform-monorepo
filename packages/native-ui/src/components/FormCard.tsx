import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './atomic/Card';

type FormCardProps = {
	className?: string;
} & PropsWithChildren;
function FormCard({ className, children }: FormCardProps) {
	return <Card className={twMerge('bg-inverse', className)}>{children}</Card>;
}

export default FormCard;
