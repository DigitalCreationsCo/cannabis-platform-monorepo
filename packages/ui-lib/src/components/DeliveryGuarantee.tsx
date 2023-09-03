import { TextContent } from '@cd/core-lib';
import { Paragraph } from './Typography';

function DeliveryGuarantee() {
	return (
		<Paragraph className="text-primary text-center font-semibold">
			{TextContent.delivery.GRAS_WILL_DELIVER_STRAIGHT_TO_YOUR_DOOR}
			<br />
			{TextContent.delivery.TIME_GUARANTEE}
		</Paragraph>
	);
}

export default DeliveryGuarantee;
