/* eslint-disable @typescript-eslint/naming-convention */
export type WidgetHost = 'localhost' | 'sunnyside' | 'manasupplyco';

type DispensaryOptions = {
	dispensaryId: string;
	dispensaryName: string;
};

export type DeliveryWidgetConfigOptions = DispensaryOptions & WidgetUIOptions;
type WidgetUIOptions = {
	position: 'left' | 'right';
	shape: 'round' | 'rectangle';
};

export interface ViewProps extends DeliveryWidgetConfigOptions {
	className?: string | string[];
	expanded: boolean;
	setExpand: (expanded: boolean) => void;
}
export type ViewComponent = (props: ViewProps) => JSX.Element;

export type CrawlerConfig = Record<WidgetHost, DOMDataSet>;
type DOMDataSet = Record<DOMKey, DOMSelectors[DOMKey]>;
type DOMKey = 'cart';
type DOMSelectors = {
	cart: {
		'cart-item': string;
		total: string;
		name: string;
		label: string;
		basePrice: string;
		quantity: string;
		size: string;
		unit: string;
		image: string;
	};
};
