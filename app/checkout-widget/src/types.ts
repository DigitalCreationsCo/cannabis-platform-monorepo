/* eslint-disable @typescript-eslint/naming-convention */
export type WidgetHost = 'localhost' | 'sunnyside' | 'manasupplyco';
export type DeliveryWidgetConfigOptions = DomOptions &
	DispensaryOptions &
	WidgetUIOptions;

type DomOptions = {
	parentElement?: string;
};

type DispensaryOptions = {
	dispensaryId: string;
	dispensaryName: string;
};

type WidgetUIOptions = {
	position: 'left' | 'right';
	shape: 'round' | 'rectangle';
};

export interface ViewProps extends DeliveryWidgetConfigOptions {
	className?: string | string[];
	expanded: boolean;
	setExpand: (expanded: boolean) => void;
	screenwidth: number;
}
export type ViewComponent = (props: ViewProps) => JSX.Element | JSX.Element;

export type CrawlerConfig = Record<WidgetHost, DOMDataSet>;
export type DOMKey = 'cart';
export type DOMSelector = DOMDataSet[DOMKey];
// this is the data structure that the crawler will use to dynamically traverse the dom elements and return data based on the config
export type DOMDataSet = {
	cart: {
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
