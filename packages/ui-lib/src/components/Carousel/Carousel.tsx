import { useRef, useState } from 'react';
import Slider, { type Settings as CarouselSettings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { twMerge } from 'tailwind-merge';
import Icons from '../../icons';
import Button from '../button/Button';
import FlexBox from '../FlexBox';
import IconWrapper from '../IconWrapper';
import { H5 } from '../Typography';

type CarouselItemComponent<DataType> = React.FC<{
	data: DataType;
}>;

type CarouselProps<DataType> = CarouselSettings & {
	Component: CarouselItemComponent<DataType>;
	title?: string;
	titleSize?: 'md' | 'lg';
	data: DataType[];
	dataKey: any;
};

export default function Carousel<D>({
	Component,
	title,
	titleSize = 'md',
	data = [],
	dataKey,
	...carouselProps
}: CarouselProps<D>) {
	const sliderRef = useRef<Slider>(null);

	const [current, setCurrent] = useState(0);

	// const styles = {
	// 	container: ['lg:px-12 max-h-fit overflow-hidden'],
	// 	title: [
	// 		'flex pt-1 px-8 bottom-0 whitespace-nowrap justify-start',
	// 		'cursor-default',
	// 		'h-fit',
	// 		'w-[400px]',
	// 		titleSize === 'lg' && 'text-2xl',
	// 		titleSize === 'md' && 'text-xl',
	// 	],
	// 	control: ['flex space-x-4 justify-center'],
	// 	carouselItem: ['max-w-fit carousel-item'],
	// 	carouselButton: [
	// 		'h-full top-0 absolute z-10 min-w-20 px-2',
	// 		'hidden',
	// 		'sm:block',
	// 	],
	// };

	const increment = () => {
		// if (current <= data.length) {
		setCurrent((current + 1) % data.length);
		sliderRef?.current?.slickNext();
		// }
	};
	const decrement = () => {
		setCurrent((current - 1) % data.length);
		sliderRef?.current?.slickPrev();
	};

	const slidesToShow = data.length > 0 ? Math.min(data.length, 4) : 1;

	const settings: CarouselSettings = {
		slidesToShow,
		slidesToScroll: slidesToShow,
		cssEase: 'ease-out',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					vertical: true,
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 0,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow,
					slidesToScroll: slidesToShow,
					initialSlide: 0,
				},
			},
		],
		...carouselProps,
	};

	return (
		<div className="px-4">
			<div className="px-8">{title && <H5>{title}</H5>}</div>
			<FlexBox className="min-w-full flex-row items-center">
				<CarouselButton
					direction={settings.vertical ? 'up' : 'left'}
					onClick={decrement}
				/>
				<Slider ref={sliderRef} {...settings} className="px-4 w-full">
					{data.length > 0 &&
						data.map((el, index) => (
							<Component key={dataKey + '-' + index} data={el} />
						))}
				</Slider>
				<CarouselButton
					direction={settings.vertical ? 'down' : 'right'}
					onClick={increment}
				/>
			</FlexBox>
		</div>
	);
}

type CarouselButtonProps = {
	direction: 'left' | 'right' | 'up' | 'down';
	onClick: (() => void) | undefined;
};

const CarouselButton = ({ direction, onClick }: CarouselButtonProps) => {
	const arrowIcon = () => {
		switch (direction) {
			case 'left':
				return Icons.ChevronLeft;
			case 'right':
				return Icons.ChevronRight;
			case 'up':
				return Icons.ChevronUp;
			case 'down':
				return Icons.ChevronDown;
		}
	};

	const styles = {
		container: ['z-10 relative h-fit', 'hidden', 'md:block'],
		carouselButton: [
			'p-8',
			'rounded-full',
			'bg-inverse-soft hover:bg-accent-soft active:bg-accent',
		],
	};

	return (
		<div className={twMerge(styles.container)}>
			<Button
				size="sm"
				onClick={onClick}
				className={twMerge(styles.carouselButton, 'btn-circle')}
			>
				<IconWrapper Icon={arrowIcon()} />
			</Button>
		</div>
	);
};
