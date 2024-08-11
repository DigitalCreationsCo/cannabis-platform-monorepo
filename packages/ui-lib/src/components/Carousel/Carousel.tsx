import { useEffect, useRef, useState } from 'react';
import {
	default as BaseCarousel,
	type CarouselProps as BaseProps,
} from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';
import { twMerge } from 'tailwind-merge';

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
	return (
		<>
			<BaseCarousel
				className="z-0 hidden md:flex overflow-visible"
				swipeable
				// partialVisible
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

			<SimpleCarousel className="md:hidden" items={items} />
		</>
	);
}

const SimpleCarousel = ({
	className,
	items,
}: {
	className?: string;
	items: any[];
}) => {
	const [scrollPosition, setScrollPosition] = useState(0);
	const carouselRef = useRef<any>(null);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const onTouchStart = (e) => {
		setTouchStart(e.targetTouches[0].clientX);
		setIsDragging(true);
	};

	const onTouchMove = (e) => {
		if (!isDragging) return;
		const currentTouch = e.targetTouches[0].clientX;
		const diff = touchStart! - currentTouch;
		setScrollPosition((prev) => {
			const newPosition = prev + diff;
			const maxScroll =
				carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
			return Math.max(0, Math.min(newPosition, maxScroll));
		});
		setTouchStart(currentTouch);
	};

	const onTouchEnd = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		const carousel = carouselRef.current;
		if (carousel) {
			carousel.scrollLeft = scrollPosition;
		}
	}, [scrollPosition]);

	return (
		<div
			className={twMerge(['relative overflow-hidden w-full h-fit', className])}
		>
			<div
				ref={carouselRef}
				className="flex h-full overflow-x-auto scrollbar-hide px-2"
				style={{ scrollSnapType: 'none', scrollBehavior: 'auto' }}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				{items.map((item, index) => (
					<div
						key={index}
						// className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gray-200"
						className="p-2 min-w-[188px]"
					>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};
