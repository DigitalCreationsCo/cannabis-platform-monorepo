import useCheckHrefIncludes from '@cd/core-lib/src/hooks/useCheckHrefIncludes';
import { useOnClickOutside } from '@cd/ui-lib/src/hooks/index';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import styles from '../styles/theme';
import { type ViewComponent, type ViewProps } from '../types';

const View = (ViewComponent: ViewComponent, props: ViewProps) => {
	function _View(props: ViewProps) {
		const navigate = useNavigate();
		const isCheckout = useCheckHrefIncludes('checkout');
		// let pathname = location.pathname;
		// function checkPath() {
		// 	console.log('pathname changed, ', pathname);
		// 	console.log('location, ', location.pathname);
		// 	console.log('isCheckout, ', isCheckout);
		// 	if (location.pathname != pathname) {
		// 		pathname = location.pathname;
		// 		isCheckout ? navigate('/checkout') : navigate('/');
		// 	}
		// }
		useEffect(() => {
			isCheckout ? navigate('/checkout') : null;
		}, []);

		useEffect(() => {
			window.addEventListener('click', () => console.log('click'));
			return () => {
				// window.removeEventListener('click', checkPath);
			};
		}, []);
		const ref = useRef(null);
		useOnClickOutside(ref, () => props.setExpand(false));
		return (
			<div
				ref={ref}
				className={twMerge([styles.responsive, styles.theme_f(props.shape)])}
			>
				<ViewComponent {...props} />
			</div>
		);
	}
	_View.displayName = `View(${ViewComponent.name})`;
	return <_View {...props} />;
};
export default View;
