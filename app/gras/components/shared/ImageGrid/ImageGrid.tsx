import { useRandomImage } from '@cd/ui-lib';
import Image from 'next/image';
import { useRef, type ReactElement, useState, useEffect } from 'react';
import gridImages from './images';

export default function ImageGrid({ children }: { children: ReactElement[] }) {
	const parentRef = useRef<any>(null);
	const gridRef = useRef<any>(null);
	const [gridHeight, setGridHeight] = useState(0);
	const randomImages = useRandomImage(gridImages, 12); // Adjust the count as needed

	useEffect(() => {
		const updateGridHeight = () => {
			if (gridRef.current) {
				setGridHeight(gridRef.current.offsetHeight);
				centerGrid();
			}
		};

		const centerGrid = () => {
			if (gridRef.current && parentRef.current) {
				const parentWidth = parentRef.current.offsetWidth;
				const gridWidth = gridRef.current.scrollWidth;

				console.info('parentWidth: ', parentWidth);
				console.info('gridWidth: ', gridWidth);

				const marginHorizontal = (parentWidth - gridWidth) / 2;
				gridRef.current.style.marginLeft = `${marginHorizontal}px`;
				gridRef.current.style.marginRight = `${marginHorizontal}px`;
			}
		};

		const handleResize = () => {
			window.requestAnimationFrame(updateGridHeight);
		};

		const resizeObserver = new ResizeObserver(handleResize);

		if (parentRef.current) {
			resizeObserver.observe(parentRef.current);
		}

		// Update the height initially
		updateGridHeight();

		// Clean up the observer and event listener on component unmount
		return () => {
			if (parentRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				resizeObserver.unobserve(parentRef.current);
			}
			resizeObserver.disconnect();
		};
	}, []);

	const gridItem =
		'object-cover rounded-lg max-w-xs aspect-square shrink-0 min-h-full bg-green-500/75';

	const imagePadStart = 1;
	const imagePadEnd = 6;
	return (
		<div
			ref={parentRef}
			className="hidden lg:block"
			style={{
				position: 'relative',
				width: '100%',
				height: `${gridHeight}px`,
				overflow: 'hidden',
			}}
		>
			<div
				ref={gridRef}
				style={{
					minHeight: '100%',
					position: 'absolute',
					gap: '34px',
					display: 'grid',
					gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
					gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
					marginLeft: '-44px',
				}}
			>
				{Array.from(Array(imagePadStart)).map((_, i) => (
					<div
						key={`grid-image-${i}`}
						style={{
							position: 'relative',
							display: 'inline-block',
						}}
					>
						<Image {...randomImages[i]} className={gridItem} quality={25} />
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundColor: 'rgba(0, 128, 0, 0.05)',
								pointerEvents: 'none',
							}}
						/>
					</div>
				))}
				<div className="flex flex-row w-full min-h-full grow col-span-3 justify-between">
					{children}
				</div>
				{Array.from(Array(imagePadEnd)).map((_, i) => (
					<div
						key={`grid-image-${i + imagePadStart}`}
						style={{
							position: 'relative',
							display: 'inline-block',
						}}
					>
						<Image
							{...randomImages[i + imagePadStart]}
							className={gridItem}
							quality={25}
						/>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundColor: 'rgba(0, 128, 0, 0.05)',
								pointerEvents: 'none',
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
