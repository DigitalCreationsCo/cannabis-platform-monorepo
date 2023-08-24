/* eslint-disable sonarjs/no-duplicate-string */
import { type DeliveryWidgetConfigOptions, type ViewProps } from '../types';
const styles = {
	cart_list: ['mx-auto flex flex-col items-center'],
	checkout_f: (expanded: ViewProps['expanded']) => [
		expanded
			? 'pt-2 h-[480px] md:w-[540px] flex-col'
			: 'h-[48px] md:w-[310px] flex-row',
		'justify-center flex items-center',
		'transition-all duration-10 transform',
	],
	container: ['min-h-[44px] md:min-h-0 bottom-0'],
	inner_container: [
		'z-10 fixed md:block',
		'min-h-[44px] md:min-h-0 bottom-0 md:m-4 flex',
	],
	launch_f: (expanded: ViewProps['expanded']) => [
		expanded ? 'h-[100px] md:h-[98px] md:w-[540px]' : 'h-[48px] md:w-[310px]',
		'justify-center flex flex-row items-center',
		'transition-all duration-10 transform',
	],
	loading: [
		'md:rounded',
		'flex flex-col items-center justify-center',
		'md:w-[440px] h-[440px]',
		'cursor-default',
	],
	theme_f: (props: ViewProps) => [
		'bg-secondary ring ring-primary',
		props.shape === 'rectangle' ? 'md:rounded' : 'md:rounded-full',
		'w-screen md:w-auto',
		'min-h-[44px] md:min-h-0',
		// animate-[animationName_easingFunction_durationInSeconds_iterationsCount_delayInSeconds_direction]
	],
	position_f: (position: DeliveryWidgetConfigOptions['position']) => [
		position === 'right' ? 'right-0' : 'left-0',
	],
	pointer_f: (expanded: ViewProps['expanded']) => [
		expanded ? 'cursor-default' : 'cursor-pointer',
	],
	responsive: ['transition', 'transition-all duration-500 transform'],
};

export default styles;
