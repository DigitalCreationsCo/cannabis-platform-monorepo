import { type BadgeProps, Badge as BaseBadge } from 'react-daisyui';
import { twMerge } from 'tailwind-merge';

const Badge = (props: BadgeProps) => {
	const { children, className } = props;

	return (
		<>
			<BaseBadge
				{...props}
				className={twMerge('rounded text-xs py-2 text-white', className)}
			>
				{children}
			</BaseBadge>
		</>
	);
};

export default Badge;
