import GrasDeliveryWidget from './gras-delivery-widget';

// app bookmarklet for testing
export default async function bookmarklet() {
	// const GrasDeliveryWidget = await (
	// 	await import('./gras-delivery-widget')
	// ).default;
	if (window.GrasDeliveryWidget) return;
	window.GrasDeliveryWidget = GrasDeliveryWidget;

	GrasDeliveryWidget.mount({
		dispensaryId: 'bf346k4u7x2b2hhr6wsofcsc',
		dispensaryName: 'ReLeaf Shop Baltimore',
		pos: 'dutchie',
		inventory: 'dutchie',
	});
}

bookmarklet();
