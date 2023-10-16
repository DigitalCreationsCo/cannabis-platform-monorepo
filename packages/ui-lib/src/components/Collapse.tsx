import icons from '../icons';
import IconWrapper from './IconWrapper';
import { Paragraph } from './Typography';

export default function Collapse({
	item,
}: {
	item: { q: string; value: number | string };
}) {
	return (
		<div className="collapse mb-5 rounded shadow">
			<input type="checkbox" />
			<div className="collapse-title  text-xl">
				<Paragraph className="text-primary">{item.q}</Paragraph>
			</div>
			<div className="collapse-content flex flex-row space-x-4">
				<IconWrapper iconSize={28} Icon={icons.Flower} />
				<Paragraph>{item.value}</Paragraph>
			</div>
		</div>
	);
}
