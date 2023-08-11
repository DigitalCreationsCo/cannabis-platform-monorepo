import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

type FormCardProps = {
	className?: string;
} & PropsWithChildren;
function FormCard({ className, children }: FormCardProps) {
	return (
		<Card className={twMerge('bg-inverse md:!pt-12', className)}>
			{children}
		</Card>
	);
}

export default FormCard;
