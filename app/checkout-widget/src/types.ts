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
