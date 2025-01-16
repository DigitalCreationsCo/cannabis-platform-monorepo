import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const MobileCarousel = ({
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
			className={twMerge([
				'md:hidden relative overflow-hidden w-full h-fit',
				className,
			])}
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
					<div key={index} className="p-2 min-w-[188px]">
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default MobileCarousel;
