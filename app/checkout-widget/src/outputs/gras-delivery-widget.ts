async function getComponent(props: any) {
	try {
		const Widget = await (await import('../components/Widget/Widget')).default;
		return (await import('react')).createElement(Widget, props);
	} catch (error) {
		console.log(error);
		throw new Error('Error loading component');
	}
}
export default class GrasDeliveryWidget {
	static el: HTMLDivElement | null;
	static root: any;

	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	static async mount(props: import('../types').DeliveryWidgetConfigOptions) {
		const component = await getComponent(props);

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
			import('react-dom/client').then(({ createRoot }) => {
				GrasDeliveryWidget.root = createRoot(el);
				GrasDeliveryWidget.root.render(component);
			});
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
