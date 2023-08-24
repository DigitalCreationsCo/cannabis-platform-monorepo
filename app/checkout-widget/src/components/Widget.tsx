/* eslint-disable react/display-name */
import { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import styles from '../styles/theme';
import { type DeliveryWidgetConfigOptions, type ViewProps } from '../types';
import { Checkout, Launch, View } from '.';
// eslint-disable-next-line import/no-unresolved
import '../styles/tailwind.css';

// eslint-disable-next-line import/no-named-as-default-member
function Widget(props: DeliveryWidgetConfigOptions) {
	const [screenwidth, setScreenwidth] = useState(window.innerWidth);
	useEffect(() => {
		const setWindowDimensions = () => {
			setScreenwidth(window.innerWidth);
		};
		window.addEventListener('resize', setWindowDimensions);
		return () => window.removeEventListener('resize', setWindowDimensions);
	}, []);
	const [href] = useState(location.href);
	const [expanded, setExpand] = useState(false);
	const config: ViewProps = {
		...props,
		expanded,
		setExpand,
		href,
		screenwidth,
	};
	const { position } = config;
	return (
		<div className={twMerge(styles.container)}>
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
} as DeliveryWidgetConfigOptions;

export default Widget;
