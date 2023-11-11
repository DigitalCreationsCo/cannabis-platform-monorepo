// app bookmarklet for testing
export default function bookmarklet() {
	import('./gras-delivery-widget').then(({ default: GrasDeliveryWidget }) => {
		if (window.GrasDeliveryWidget) return;
		GrasDeliveryWidget.mount({
			dispensaryId: 'bf346k4u7x2b2hhr6wsofcsc',
			dispensaryName: 'ReLeaf Shop Baltimore',
			pos: 'dutchie',
		});
		window.GrasDeliveryWidget = GrasDeliveryWidget;
	});
}

bookmarklet();
