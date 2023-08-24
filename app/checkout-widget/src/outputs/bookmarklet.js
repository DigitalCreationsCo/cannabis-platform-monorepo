/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default-member */
import GrasDeliveryWidget from './gras-delivery-widget';

export default function bookmarklet() {
	if (window.GrasDeliveryWidget) {
		return;
	}
	window.GrasDeliveryWidget = GrasDeliveryWidget;

	GrasDeliveryWidget.mount();
}

bookmarklet();
