/* eslint-disable sonarjs/no-duplicate-string */
import {
	type DeliveryWidgetConfigOptions,
	type ViewProps,
} from '../widget.types';
const styles = {
	cart_list: [
		'mx-auto flex flex-col items-center ',
		'overflow-y-auto overscroll-none',
	],
	checkout_f: (expanded: ViewProps['expanded']) => [
		expanded ? 'touch-none' : 'touch-auto',
		expanded
			? 'p-2 h-[520px] md:h-2/3 md:w-[540px] flex-col'
			: 'h-[48px] md:w-[310px] flex-row',
		'justify-center flex items-center',
	],
	container: ['min-h-[44px] md:min-h-0 w-fit bottom-0'],
	inner_container_f: (props: ViewProps) => [
		props.parentElement ? 'relative' : 'fixed',
		props.expanded ? 'md:w-fit' : 'md:w-[310px]',
		'z-50 md:block',
		'min-h-[44px] md:min-h-0 bottom-0 md:m-4 flex',
	],
	launch_f: (expanded: ViewProps['expanded']) => [
		expanded ? 'h-[100px] md:h-[98px] md:w-[540px]' : 'h-[48px] md:w-[310px]',
		'justify-center flex flex-row items-center',
	],
	loading: [
		'md:rounded',
		'flex flex-col items-center justify-center',
		'md:w-[440px] h-[440px]',
		'cursor-default',
	],
	theme_f: (props: ViewProps) => [
		'bg-secondary ring ring-primary',
		props.shape === 'rectangle'
			? 'md:rounded'
			: props.expanded
			? 'md:rounded-xl'
			: 'md:rounded-full',
		'w-screen md:w-fit',
		'min-h-[44px] md:min-h-0',
		props.expanded && 'py-2',
		// animate-[animationName_easingFunction_durationInSeconds_iterationsCount_delayInSeconds_direction]
	],
	position_f: (position: DeliveryWidgetConfigOptions['position']) => [
		position === 'right' ? 'right-0' : 'left-0',
	],
	pointer_f: (expanded: ViewProps['expanded']) => [
		expanded ? 'cursor-default' : 'cursor-pointer',
	],
	transition: ['transition-all', 'duration-100'],
	tooltip: [
		'before:animate-bounce before:w-[100px] before:text-center before:m-auto before:justify-center before:flex before:items-center before:text-lg tooltip tooltip-open tooltip-success',
	],
};

export default styles;
