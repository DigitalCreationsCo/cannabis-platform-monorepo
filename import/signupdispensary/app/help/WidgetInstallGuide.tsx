import { generateWidgetScriptTag } from '@gras/core';
import {
	Paragraph,
	H2,
	CopyRight,
	FlexBox,
	CopyClipboardButton,
} from '@gras/ui';
import { useCallback } from 'react';

function WidgetInstallGuide() {
	const organization = {
		name: 'DISPENSARY_NAME',
		id: 'DISPENSARY_ID',
	};
	const position = 'right';
	const shape = 'rectangle';
	const pos = 'none';
	const inventory = 'none';

	const WidgetScript = useCallback(
		() => (
			<div className="bg-gray-200 p-4 font-encode tracking-widest">
				<CopyClipboardButton
					copyText={generateWidgetScriptTag({
						id: organization.id,
						name: organization.name,
						position,
						shape,
						pos,
						inventory,
					})}
				/>
				<Paragraph className="text-left">SAMPLE SCRIPT</Paragraph>
				{generateWidgetScriptTag({
					id: organization.id,
					name: organization.name,
					position,
					shape,
					pos,
					inventory,
				})}
			</div>
		),
		[position, shape, pos]
	);

	return (
		<div className="md:m-auto max-w-lg space-y-4">
			<H2 className="text-primary">Delivery By Gras Install Guide</H2>
			<FlexBox className="pb-2">
				<Paragraph>
					The Delivery By Gras script tags can be found in the Widget Setup
					section of your{' '}
					<a
						href={process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}
						className="font-semibold hover:underline"
					>
						Dispensary dashboard
					</a>
					{'\n'}The script renders the Delivery By Gras widget wherever it is
					placed. You can set a parent element for the script by using an
					element selector in the parentElement property.
				</Paragraph>
				<Paragraph>
					Add this code to your ecommerce website, and customers will be able to
					place orders for delivery.
				</Paragraph>
			</FlexBox>
			<hr />
			<FlexBox className="mx-auto flex-row items-center justify-center">
				<Paragraph className="font-semibold">{`Dispensary Name: ${organization.name}`}</Paragraph>
			</FlexBox>
			<FlexBox className="mx-auto flex-row items-center justify-center">
				<Paragraph className="font-semibold">{`Dispensary Id: ${organization.id}`}</Paragraph>
			</FlexBox>
			<WidgetScript />
			<CopyRight />
		</div>
	);
}

export default WidgetInstallGuide;
