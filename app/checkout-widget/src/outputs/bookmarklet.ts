/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default-member */
import GrasDeliveryWidget from './gras-delivery-widget';

export default function bookmarklet() {
	if (window.GrasDeliveryWidget) {
		return;
	}
	window.GrasDeliveryWidget = GrasDeliveryWidget;

	GrasDeliveryWidget.mount({
		dispensaryId: 'bf346k4u7x2b2hhr6wsofcsc',
		dispensaryName: 'ReLeaf Shop Baltimore',
		useDutchie: true,
	});
}

bookmarklet();
