import { type PropsWithChildren } from 'react';
import { Card } from '@components';

type FormCardProps = {
	className?: string;
} & PropsWithChildren;
function FormCard({ children }: FormCardProps) {
	return <Card>{children}</Card>;
}

export default FormCard;
