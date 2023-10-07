/* eslint-disable @typescript-eslint/consistent-type-imports */
import { lazy, useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { View } from '..';
import styles from '../../styles/theme';
// eslint-disable-next-line import/no-unresolved
import '../../styles/tailwind.css';

const Launch = lazy(
	() => import('../Launch'),
) as import('../../types').ViewComponent;
const Checkout = lazy(
	() => import('../Checkout'),
) as import('../../types').ViewComponent;

function Widget(props: import('../../types').DeliveryWidgetConfigOptions) {
	const [expanded, setExpand] = useState(false);
	const [screenwidth, setScreenwidth] = useState(window.innerWidth);
	const config: import('../../types').ViewProps = {
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
						<Route path="/checkout" element={View(Checkout, config)} />
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
} as import('../../types').DeliveryWidgetConfigOptions;

export default Widget;
