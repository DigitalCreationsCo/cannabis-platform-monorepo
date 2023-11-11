/* eslint-disable @typescript-eslint/naming-convention */
import { type POS } from '@cd/data-access';

export type DeliveryWidgetConfigOptions = DOMOptions &
	DispensaryOptions &
	UIOptions;

type UIOptions = {
	position?: 'left' | 'right';
	shape?: 'round' | 'rectangle';
};
type DispensaryOptions = {
	dispensaryId: string;
	dispensaryName: string;
	pos: POS;
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
export type CrawlerConfig = Record<WidgetHost, Record<any, DOMSelector>>;
export type DOMKey = 'cart' | 'dutchie' | 'blaze' | 'weedmaps' | 'leafly';
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
export type DOMDataSet = Record<DOMKey, DOMSelector>;
// 	cart: DOMSelector;
// 	dutchie: DOMSelector;
// };

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
	dutchie: {
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
