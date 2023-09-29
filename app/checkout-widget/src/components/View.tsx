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
	const clickOutsideRef = useRef(null);
	useOnClickOutside(clickOutsideRef, () => props.setExpand(false));

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

		return <ViewComponent {...props} />;
	};
	_View.displayName = `View(${ViewComponent.name})`;

	return (
		<div
			id="Widget-View"
			ref={clickOutsideRef}
			className={twMerge(styles.transition, styles.theme_f(props))}
		>
			<_View {...props} />
		</div>
	);
};
export default ViewWrapper;
