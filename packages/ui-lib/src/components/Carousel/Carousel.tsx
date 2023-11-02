import { type ArticleTag } from '@cd/data-access';
import { useEffect, useRef, useState } from 'react';
import Slider, { type Settings as CarouselSettings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { twMerge } from 'tailwind-merge';
import Icons from '../../icons';
import Button from '../button/Button';
import FlexBox from '../FlexBox';
import IconWrapper from '../IconWrapper';
import { H5 } from '../Typography';

// TO DO: make responsive showSlides, slidesPresented, and variableWidth
// clean up interface

type CarouselComponent<DataType> = React.FC<{
	data: DataType;
	loading: boolean;
}>;

type CarouselProps<DataType> = CarouselSettings & {
	Component: CarouselComponent<DataType>;
	title?: string;
	titleSize?: 'md' | 'lg';
	data: DataType[];
	dataKey: ArticleTag;
	interval?: number;
	infinite?: boolean;
	run?: boolean;
	skeletonNum: number;
	loading: boolean;
	startHidden: boolean;
};

export default function Carousel<D>({
	startHidden = true,
	Component,
	title,
	titleSize = 'md',
	data = [],
	skeletonNum,
	dataKey,
	loading,
	...props
}: CarouselProps<D>) {
	const _loading = [...Array(skeletonNum).keys()];
	const slidesToShow = loading
		? skeletonNum
		: data.length > 0
		? Math.min(data.length, 4)
		: 1;
	const settings: CarouselSettings = {
		rows: 1,
		lazyLoad: 'anticipated',
		arrows: false,
		variableWidth: true,
		adaptiveHeight: true,
		infinite: true,

		edgeFriction: 0.1,
		speed: 440,
		autoplay: true,
		autoplaySpeed: props.autoplaySpeed || 5000,

		slidesToShow,
		swipeToSlide: true,
		slidesToScroll: 1,
		cssEase: 'ease-out',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow,
					slidesToScroll: 1,
				},
			},
		],
		...props,
	};

	const styles = {
		container: ['lg:px-12 max-h-fit overflow-hidden'],
		title: [
			'flex pt-1 px-8 bottom-0 whitespace-nowrap justify-start',
			'cursor-default',
			'h-fit',
			'w-[400px]',
			titleSize === 'lg' && 'text-2xl',
			titleSize === 'md' && 'text-xl',
		],
		control: ['flex space-x-4 justify-center'],
		carouselItem: ['max-w-fit carousel-item'],
		carouselButton: [
			'h-full top-0 absolute z-10 min-w-20 px-2',
			'hidden',
			'sm:block',
		],
	};

	const sliderRef = useRef<Slider>(null);
	const [hideCarousel, setHideCarousel] = useState(startHidden);
	useEffect(() => {
		if (hideCarousel === false) {
			setHideCarousel(!startHidden && !loading && data.length === 0);
		}
	}, [data]);

	const [current, setCurrent] = useState(0);
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

	return (
		<div className={twMerge(styles.container, hideCarousel && 'hidden')}>
			<FlexBox className="flex-row items-center">
				{title && <H5 className={twMerge(styles.title)}>{title}</H5>}
				<div className={twMerge(styles.control)}>
					<CarouselButton
						direction={settings.vertical ? 'up' : 'left'}
						onClick={decrement}
					/>
					<CarouselButton
						direction={settings.vertical ? 'down' : 'right'}
						onClick={increment}
					/>
				</div>
			</FlexBox>

			<Slider ref={sliderRef} className="w-screen" {...settings}>
				{data.length > 0 && !loading
					? data.map((el, index) => (
							<div
								key={dataKey + '-container-' + index}
								className="max-w-fit py-2 carousel-item m-2"
							>
								<Component
									key={dataKey + '-' + index}
									data={el}
									loading={loading}
								/>
							</div>
					  ))
					: (loading &&
							_loading.map((el, index) => (
								<div
									key={dataKey + '-container-' + index}
									className="max-w-fit py-2 carousel-item m-2"
								>
									<Component
										key={dataKey + '-' + index}
										data={el as any}
										loading={loading}
									/>
								</div>
							))) || (
							<div
								key={dataKey + '-container-0'}
								className="max-w-fit py-2 carousel-item m-2"
							>
								<Component data={data[0]} loading={loading} />
							</div>
					  )}
			</Slider>
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
			'p-4',
			'h-10 w-20',
			'rounded-lg bg-inverse-soft hover:bg-accent-soft active:bg-accent',
		],
	};

	return (
		<div className={twMerge(styles.container)}>
			<Button onClick={onClick} className={twMerge(styles.carouselButton)}>
				<IconWrapper Icon={arrowIcon()} />
			</Button>
		</div>
	);
};
