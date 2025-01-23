import { twMerge } from 'tailwind-merge';
import Card from '../Card';

function SkeletonCard({ className }: { className: string | string[] }) {
	return (
		<Card className={twMerge('!px-4 animate-pulse', className)}>
			<div className="animate-pulse"></div>
		</Card>
	);
}

export default SkeletonCard;
