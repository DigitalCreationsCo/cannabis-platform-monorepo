import useCheckHrefIncludes from '@cd/core-lib/src/hooks/useCheckHrefIncludes';
import { useOnClickOutside } from '@cd/ui-lib/src/hooks/index';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
// import url from 'url-state';
import styles from '../styles/theme';
import { type ViewComponent, type ViewProps } from '../types';

const View = (ViewComponent: ViewComponent, props: ViewProps) => {
	function _View(props: ViewProps) {
		const navigate = useNavigate();
		const isCheckout = useCheckHrefIncludes('checkout');

		let pathname = location.pathname;

		// useEffect(() => {
		// 	isCheckout ? navigate('/checkout') : null;
		// });

		useEffect(() => {
			function checkPath() {
				if (location.pathname != pathname) {
					pathname = location.pathname;
					// console.info('is checkout? ', useCheckHrefIncludes('checkout'))
					// eslint-disable-next-line react-hooks/rules-of-hooks
					useCheckHrefIncludes('checkout')
						? navigate('/checkout')
						: navigate('/');
				}
			}
			window.addEventListener('click', () => {
				console.log('click');
				checkPath();
			});
			return () => {
				window.removeEventListener('click', () => {
					console.log('click');
					checkPath();
				});
			};
		}, []);

		const ref = useRef(null);
		useOnClickOutside(ref, () => props.setExpand(false));
		return (
			<div
				id="gras-widget-view"
				ref={ref}
				className={twMerge(styles.responsive, styles.theme_f(props))}
			>
				<ViewComponent {...props} />
			</div>
		);
	}
	_View.displayName = `View(${ViewComponent.name})`;
	return <_View {...props} />;
};
export default View;
