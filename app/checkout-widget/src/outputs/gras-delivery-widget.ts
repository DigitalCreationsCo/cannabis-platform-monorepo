import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import Widget from '../components/Widget';
import { type DeliveryWidgetConfigOptions } from '../types';

export default class GrasDeliveryWidget {
	static el: HTMLDivElement | null;
	static root: any;

	static mount(props: DeliveryWidgetConfigOptions) {
		const component = createElement(Widget, props);
		function doRender() {
			if (GrasDeliveryWidget.el) {
				throw new Error('GrasDeliveryWidget is already mounted, unmount first');
			}
			const el = document.createElement('div');
			el.id = 'gras-delivery-widget';
			if (props.parentElement) {
				(document.querySelector(props.parentElement) as any).appendChild(el);
			} else {
				document.body.appendChild(el);
			}
			GrasDeliveryWidget.root = createRoot(el);
			GrasDeliveryWidget.root.render(component);
			GrasDeliveryWidget.el = el;
		}
		if (document.readyState === 'complete') {
			doRender();
		} else {
			window.addEventListener('load', () => {
				doRender();
			});
		}
	}

	static unmount() {
		if (!GrasDeliveryWidget.el) {
			throw new Error('GrasDeliveryWidget is not mounted, mount first');
		}
		GrasDeliveryWidget.el.parentNode?.removeChild(GrasDeliveryWidget.el);
		GrasDeliveryWidget.root.unmount(GrasDeliveryWidget.el);
		GrasDeliveryWidget.el = null;
	}
}
