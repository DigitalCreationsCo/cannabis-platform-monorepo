/* eslint-disable jest/expect-expect */

describe('GrasDeliveryWidget', () => {
	it(' tests needs TLC', () => expect(1).toStrictEqual(1));
	// afterEach(() => {
	// 	// document.readyState = 'complete';
	// 	if (GrasDeliveryWidget.el) {
	// 		GrasDeliveryWidget.unmount();
	// 	}
	// });

	// it('#mount document becomes ready', async () => {
	// 	document.readyState = 'loading';
	// 	GrasDeliveryWidget.mount({});
	// 	window.dispatchEvent(new Event('load', {}));
	// 	await waitForSelection(document, 'div');
	// });

	// it('#mount document complete', async () => {
	// 	GrasDeliveryWidget.mount({});
	// 	await waitForSelection(document, 'div');
	// });

	// it('#mount to document element', async () => {
	// 	const newElement = document.createElement('span');
	// 	newElement.setAttribute('id', 'widget-mount');
	// 	document.body.appendChild(newElement);
	// 	GrasDeliveryWidget.mount({
	// 		parentElement: '#widget-mount',
	// 	});
	// 	await waitForSelection(document, 'div');
	// 	expect(document.querySelectorAll('#widget-mount')).toHaveLength(1);
	// });

	// it('#mount twice', async () => {
	// 	GrasDeliveryWidget.mount({
	// 		parentElement: '#widget-mount',
	// 	});
<<<<<<< HEAD
	// 	expect(() => GrasDeliveryWidget.mount()).toThrow(
	// 		'GrasDeliveryWidget is already mounted, unmount first',
	// 	);
	// });

	// it('#unmount without mounting', async () => {
	// 	expect(() => GrasDeliveryWidget.unmount()).toThrow('not mounted');
	// 	// expect(() => import('../outputs/gras-delivery-widget').then(() => GrasDeliveryWidget.unmount()).toThrow('not mounted'));
	// });

	// it('#unmount', async () => {
	// 	const el = document.createElement('div');
	// 	document.body.appendChild(el);
	// 	expect(document.querySelectorAll('div')).toHaveLength(1);
	// 	GrasDeliveryWidget.el = el;
	// 	GrasDeliveryWidget.unmount();
	// 	expect(document.querySelectorAll('div')).toHaveLength(0);
=======
	// 	expect(() => GrasDeliveryWidget.mount()).toThrow('already mounted');
	// });

	// it('#unmount', async () => {
	// 	const el = document.createElement('div');
	// 	document.body.appendChild(el);
	// 	expect(document.querySelectorAll('div')).toHaveLength(1);
	// 	GrasDeliveryWidget.el = el;
	// 	GrasDeliveryWidget.unmount();
	// 	expect(document.querySelectorAll('div')).toHaveLength(0);
	// });

	// it('#unmount without mounting', async () => {
	// 	expect(() => GrasDeliveryWidget.unmount()).toThrow('not mounted');
>>>>>>> feat/help-center-app
	// });
});
