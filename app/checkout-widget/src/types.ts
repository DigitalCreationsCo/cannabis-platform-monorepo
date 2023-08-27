/* eslint-disable @typescript-eslint/naming-convention */

export type DeliveryWidgetConfigOptions = DOMOptions &
	DispensaryOptions &
	UIOptions;

type UIOptions = {
	position: 'left' | 'right';
	shape: 'round' | 'rectangle';
};
type DispensaryOptions = {
	dispensaryId: string;
	dispensaryName: string;
	useDutchie: boolean;
};
type DOMOptions = {
	parentElement?: string;
};

export type ViewComponent = (props: ViewProps) => JSX.Element | JSX.Element;
export interface ViewProps extends DeliveryWidgetConfigOptions {
	expanded: boolean;
	setExpand: (expanded: boolean) => void;
	screenwidth: number;
}

export type WidgetHost = 'localhost' | 'sunnyside' | 'manasupply' | 'dutchie';

// resolve the type of the config object
// export type SelectDOMKey<T extends DOMKey> = Extract<DOMKey, T>;
export type CrawlerConfig = Record<
	WidgetHost,
	Record<keyof DOMKey, DOMSelector>
>;
export type DOMKey = 'cart' | 'dutchie-checkout';
export type DOMSelector = {
	item: {
		name: string;
		label: string;
		basePrice: string;
		quantity: string;
		size: string;
		unit: string;
		image: string;
		'cart-item': string;
	};
	total: string;
};

// typeset of dom selectors
export type DOMDataSet = {
	cart: DOMSelector;
	'dutchie-checkout': DOMSelector;
};

export type DOMQueryResult = {
	cart: {
		items: {
			name: string;
			label: string;
			basePrice: string;
			quantity: string;
			size: string;
			unit: string;
			image: string;
			'cart-item': string;
		}[];
		total: string;
	};
};
