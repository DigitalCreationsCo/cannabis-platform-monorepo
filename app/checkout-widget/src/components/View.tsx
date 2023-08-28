import useCheckHrefIncludes from '@cd/core-lib/src/hooks/useCheckHrefIncludes';
import { useOnClickOutside } from '@cd/ui-lib/src/hooks/index';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
// import url from 'url-state';
import styles from '../styles/theme';
// import url from 'url-state';
import { type ViewComponent, type ViewProps } from '../types';

const ViewWrapper = (ViewComponent: ViewComponent, props: ViewProps) => {
	const _View = (props: ViewProps) => {
		const navigate = useNavigate();
		let pathname = location.pathname;
		useEffect(() => {
			function checkPath() {
				if (location.pathname != pathname) {
					pathname = location.pathname;
					// eslint-disable-next-line react-hooks/rules-of-hooks
					useCheckHrefIncludes('checkout')
						? navigate('/checkout')
						: navigate('/');
				}
			}
			window.addEventListener('click', () => {
				checkPath();
			});
			return () => {
				window.removeEventListener('click', () => {
					checkPath();
				});
			};
		}, []);

		const clickOutsideRef = useRef(null);
		useOnClickOutside(clickOutsideRef, () => props.setExpand(false));

		return (
			<div
				id="Widget-View"
				ref={clickOutsideRef}
				className={twMerge(styles.responsive, styles.theme_f(props))}
			>
				<ViewComponent {...props} />
			</div>
		);
	};
	_View.displayName = `View(${ViewComponent.name})`;

	return <_View {...props} />;
};
export default ViewWrapper;
