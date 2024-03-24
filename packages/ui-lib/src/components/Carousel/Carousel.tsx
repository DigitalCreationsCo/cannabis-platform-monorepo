import { useRef, useState } from 'react';
import Slider, { type Settings } from 'react-slick';
import { twMerge } from 'tailwind-merge';
import Icons from '../../icons';
import Button from '../button/Button';
import FlexBox from '../FlexBox';
import IconWrapper from '../IconWrapper';
import CarouselButton from './CarouselButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CarouselItemComponent<DataType> = React.FC<{
	data: DataType;
}>;

type CarouselProps<DataType> = {
	data: DataType[];
	datatype: string;
	title?: string;
	SliderComponent: CarouselItemComponent<DataType>;
	settings?: Settings;
};

export default function Carousel<D>({
	data = [],
	datatype,
	title,
	SliderComponent,
	settings,
}: CarouselProps<D>) {
	const slider = useRef<Slider>(null);
	const [current, setCurrent] = useState(0);

	const increment = () => {
		// if (current <= data.length) {
		setCurrent((current + 1) % data.length);
		slider?.current?.slickNext();
		// }
	};
	const decrement = () => {
		setCurrent((current - 1) % data.length);
		slider?.current?.slickPrev();
	};

	const slidesToShow = data.length > 0 ? Math.min(data.length, 4) : 1;

	const carouselSettings: Settings = {
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
		...settings,
	};

	return (
		<div className="w-full">
			<Slider
				{...carouselSettings}
				ref={slider}
				className="w-screen flex flex-row items-center"
				prevArrow={
					<CarouselButton direction={'left'} onClick={() => decrement()} />
				}
				nextArrow={
					<CarouselButton direction={'right'} onClick={() => increment()} />
				}
			>
				{data.map((d, index) => (
					<SliderComponent key={`${datatype}-${index}`} data={d} />
				))}
			</Slider>
		</div>
	);
}
