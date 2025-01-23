import { TextContent } from '../../../core/src/constants';
import { Paragraph } from './Typography';

function DeliveryGuarantee() {
	return (
		<Paragraph className="text-primary text-center font-semibold">
			{TextContent.info.GRAS_WILL_DELIVER_STRAIGHT_TO_YOUR_DOOR}
			<br />
			{TextContent.info.TIME_GUARANTEE}
		</Paragraph>
	);
}

export default DeliveryGuarantee;
