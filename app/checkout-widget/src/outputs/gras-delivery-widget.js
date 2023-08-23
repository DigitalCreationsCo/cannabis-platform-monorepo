import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Widget from '../Widget';

export default class GrasDeliveryWidget {
	static el;

	static mount({ parentElement = null, ...props } = {}) {
		const component = React.createElement(Widget, props);

		function doRender() {
			if (GrasDeliveryWidget.el) {
				throw new Error('GrasDeliveryWidget is already mounted, unmount first');
			}
			const el = document.createElement('div');
			el.id = "gras-delivery-widget" 
			if (parentElement) {
				document.querySelector(parentElement).appendChild(el);
			} else {
				document.body.appendChild(el);
			}
			const root = createRoot(el);
			root.render(component);
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
		ReactDOM.unmountComponentAtNode(GrasDeliveryWidget.el);
		GrasDeliveryWidget.el.parentNode.removeChild(GrasDeliveryWidget.el);
		GrasDeliveryWidget.el = null;
	}
}
