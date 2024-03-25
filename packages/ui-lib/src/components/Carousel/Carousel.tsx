import { useRef, useState } from 'react';
import Slider, { type Settings } from 'react-slick';
import CarouselButton from './CarouselButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CarouselItemComponent<DataType> = React.FC<{
	data: DataType;
	loading: boolean;
}>;

type CarouselProps<DataType> = {
	error?: any;
	loading: boolean;
	data: DataType[];
	datatype: string;
	title?: string;
	SliderComponent: CarouselItemComponent<DataType>;
	settings?: Settings;
};

export default function Carousel<D>({
	loading,
	error,
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

	const slidesToShow = data.length > 0 ? Math.min(data.length, 3) : 1;

	const carouselSettings: Settings = {
		arrows: false,
		slidesToShow,
		slidesToScroll: 1,
		cssEase: 'ease-out',
		responsive: [
			{
				breakpoint: 450,
				settings: {
					swipe: true,
					centerMode: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 0,
				},
			},
			// 	{
			// 		breakpoint: 1024,
			// 		settings: {
			// 			// slidesToShow,
			// 			// slidesToScroll: slidesToShow,
			// 			// initialSlide: 0,
			// 			slidesToShow: 2,
			// 			slidesToScroll: 2,
			// 		},
			// 	},
		],
		...settings,
	};

	if (error) {
		return <p>Failed to fetch</p>;
	}

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<div className="flex flex-row grow items-center overflow-clip">
			<CarouselButton direction={'left'} onClick={() => decrement()} />
			<Slider ref={slider} {...carouselSettings} className="overflow-clip">
				{data.map((d, index) => (
					<div key={`slider-${index}`} className="pr-4">
						<SliderComponent
							key={`${datatype}-${index}`}
							data={d}
							loading={loading}
						/>
					</div>
				))}
			</Slider>
			<CarouselButton
				className="ml-auto"
				direction={'right'}
				onClick={() => increment()}
			/>
		</div>
	);
}
