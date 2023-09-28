import { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import styles from '../styles/theme';
import { type DeliveryWidgetConfigOptions, type ViewProps } from '../types';
import { Checkout, Launch, View } from '.';
// eslint-disable-next-line import/no-unresolved
import '../styles/tailwind.css';

function Widget(props: DeliveryWidgetConfigOptions) {
	const [expanded, setExpand] = useState(false);
	const [screenwidth, setScreenwidth] = useState(window.innerWidth);
	const config: ViewProps = {
		...props,
		expanded,
		setExpand,
		screenwidth,
	};
	const { position } = config;

	useEffect(() => {
		const setWindowDimensions = () => setScreenwidth(window.innerWidth);
		window.addEventListener('resize', setWindowDimensions);
		return () => window.removeEventListener('resize', setWindowDimensions);
	}, []);

	useEffect(() => {
		// check if the widget is being overlapped by another element
		function overlayCheck() {
			// const points = document.querySelectorAll('div');
			// const rightPos = (elem: any) => elem.getBoundingClientRect().right;
			// const leftPos = (elem: any) => elem.getBoundingClientRect().left;
			// const topPos = (elem: any) => elem.getBoundingClientRect().top;
			// const btmPos = (elem: any) => elem.getBoundingClientRect().bottom;
			// for (let i = 0; i < points.length; i++) {
			// 	for (let j = 0; j < points.length; j++) {
			// 		const isOverlapping = !(
			// 			rightPos(points[i]) < leftPos(points[j]) ||
			// 			leftPos(points[i]) > rightPos(points[j]) ||
			// 			btmPos(points[i]) < topPos(points[j]) ||
			// 			topPos(points[i]) > btmPos(points[j])
			// 		);
			// 		if (isOverlapping && j !== i) {
			// 			points[i].innerHTML = `${points[i].innerHTML} C`;
			// 		}
			// 	}
			// }
		}
		overlayCheck();
	}, []);

	return (
		<div id="Widget-Container" className={twMerge(styles.container)}>
			<div
				className={twMerge([
					styles.inner_container,
					styles.position_f(position),
					styles.pointer_f(expanded),
				])}
			>
				<MemoryRouter>
					<Routes>
						<Route path="/" element={View(Launch, config)} />
						<Route path="/checkout" element={View(Checkout as any, config)} />
					</Routes>
				</MemoryRouter>
			</div>
		</div>
	);
}

Widget.defaultProps = {
	position: 'right',
	shape: 'rectangle',
	useDutchie: false,
} as DeliveryWidgetConfigOptions;

export default Widget;
