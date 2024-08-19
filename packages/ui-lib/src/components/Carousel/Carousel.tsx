import { useCallback } from 'react';
import {
	default as BaseCarousel,
	type CarouselProps as BaseProps,
} from 'react-multi-carousel';
import './Carousel.css';
import MobileCarousel from './MobileCarousel';

type CarouselItemComponent<DataType> = React.FC<{
	data: DataType;
	loading: boolean;
	current: boolean;
}>;

type CarouselProps<DataType> = {
	title?: string;
	items: any[];
} & Partial<BaseProps>;

export default function Carousel<D>({
	items,
	title,
	responsive,
	...carouselProps
}: CarouselProps<D>) {
	const renderCarousel = useCallback(
		() => (
			<>
				<BaseCarousel
					className="z-0 hidden md:flex overflow-visible"
					swipeable={false}
					draggable={false}
					centerMode
					removeArrowOnDeviceType={['tablet', 'mobile']}
					renderArrowsWhenDisabled
					responsive={{
						xl: {
							breakpoint: { max: 4000, min: 1400 },
							items: 4,
							slidesToSlide: 4,
							// partialVisibilityGutter: 40,
						},
						lg: {
							breakpoint: { max: 1400, min: 1100 },
							items: 4,
							slidesToSlide: 3,
							// partialVisibilityGutter: 40,
						},
						md: {
							breakpoint: { max: 1100, min: 700 },
							items: 3,
							slidesToSlide: 2,
							// partialVisibilityGutter: 40,
						},
						sm: {
							breakpoint: { max: 700, min: 464 },
							items: 2,
							// partialVisibilityGutter: 40,
						},
						xs: {
							breakpoint: { max: 464, min: 0 },
							items: 1,
							slidesToSlide: 1,
							// partialVisibilityGutter: 40,
						},
						...responsive,
					}}
					{...carouselProps}
				>
					{items}
				</BaseCarousel>
			</>
		),
		[items]
	);

	return (
		<>
			{renderCarousel()}
			<MobileCarousel items={items} />
		</>
	);
}
