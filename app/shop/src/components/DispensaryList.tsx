import { Button, H5 } from '@cd/ui-lib';
import { useMemo, useState } from 'react';

type DispensaryListProps = {
	title: string;
	list: {
		name: string;
		id: string;
		subdomainId: string;
	}[];
	loading: boolean;
};
function DispensaryListCarousel({ title, list }: DispensaryListProps) {
	const dispensaryList = useMemo(() => list, [list]);

	const [slideIndex, setSlideindex] = useState(0);
	const decrement = (e: any) => {
		e.stopPropagation();
		if (slideIndex > 0) setSlideindex(slideIndex - 1);
	};
	const increment = (e: any) => {
		e.stopPropagation();
		if (slideIndex < list.length - 1) setSlideindex(slideIndex + 1);
	};

	const styles = {
		carouselButton: 'px-6 hidden sm:block'
	};
	return (
		<>
			<H5 className="pl-4 sm:!pl-12">{title}</H5>

			<div className="flex flex-row items-center overflow-auto">
				<a onClick={decrement} href={'#dispensary-card-' + slideIndex}>
					<Button
						bg="transparent"
						size="sm"
						className={styles.carouselButton}
						hover="transparent"
					>
						❮
					</Button>
				</a>
				<div className="carousel rounded-box carousel-center w-full items-center space-x-4 p-2">
					{dispensaryList.length > 0
						? dispensaryList.map((dispensary, index) => (
								<div
									key={'dispensary-card-' + index}
									id={'dispensary-card-' + index}
									className="carousel-item"
								>
									{/* <DispensaryCard key={'dispensary-' + dispensary.id} dispensary={dispensary as any} /> */}
								</div>
						  ))
						: [0, 1, 2, 3].map((el) => (
								<div
									key={'loading-dispensary-card-' + el}
									className="carousel-item"
								>
									{/* <DispensaryCard key={'dispensary-' + el} /> */}
								</div>
						  ))}
				</div>
				<a onClick={increment} href={'#dispensary-card-' + slideIndex}>
					<Button
						bg="transparent"
						size="sm"
						className={styles.carouselButton}
						hover="transparent"
					>
						❯
					</Button>
				</a>
			</div>
		</>
	);
}

export default DispensaryListCarousel;
