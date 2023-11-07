import { twMerge } from 'tailwind-merge';
import icons from '../icons';
import IconWrapper from './IconWrapper';
import { Paragraph } from './Typography';

export default function Collapse({
	item,
	className,
}: {
	item: { q: string; value: number | string };
	className?: string | string[];
}) {
	return (
		<div
			className={twMerge(
				'collapse mb-5 rounded drop-shadow-md w-full',
				'bg-inverse',
				className,
			)}
		>
			<input type="checkbox" />
			<div className="collapse-title text-xl">
				<Paragraph className="text-lg md:text-lg">{item.q}</Paragraph>
			</div>
			<div className="collapse-content flex flex-row space-x-4">
				<IconWrapper
					iconSize={28}
					Icon={icons.Flower}
					className="hidden sm:block"
				/>
				<Paragraph>{item.value}</Paragraph>
			</div>
		</div>
	);
}
