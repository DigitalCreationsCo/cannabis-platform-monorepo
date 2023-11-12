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
) as import('../../widget.types').ViewComponent;
const Checkout = lazy(
	() => import('../Checkout'),
) as import('../../widget.types').ViewComponent;

function Widget(
	props: import('../../widget.types').DeliveryWidgetConfigOptions,
) {
	const [expanded, setExpand] = useState(false);
	const [screenwidth, setScreenwidth] = useState(window.innerWidth);
	const config: import('../../widget.types').ViewProps = {
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
		styles.position_f(position),
		(
			<div
				id="Widget-Container"
				className={twMerge([styles.container, styles.position_f(position)])}
			>
				<div
					className={twMerge([
						styles.inner_container_f(config),
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
		)
	);
}

Widget.defaultProps = {
	position: 'right',
	shape: 'rectangle',
	pos: 'none',
} as import('../../widget.types').DeliveryWidgetConfigOptions;

export default Widget;
