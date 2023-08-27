import useCheckHrefIncludes from '@cd/core-lib/src/hooks/useCheckHrefIncludes';
import { useOnClickOutside } from '@cd/ui-lib/src/hooks/index';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
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
					// console.info('is checkout? ', useCheckHrefIncludes('checkout'))
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
				{...props}
				id="Widget-View"
				ref={clickOutsideRef}
				className={twMerge(styles.responsive, styles.theme_f(props))}
			>
				<ViewComponent {...props} />
			</div>
		);
	};
	_View.displayName = `View(${ViewComponent.name})`;

	return (
		<div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
			<_View {...props} />
		</div>
	);
};
export default ViewWrapper;

function lockScroll(e: Event) {
	e.preventDefault();
	// e.stopPropagation();
	e.stopImmediatePropagation();
	return false;
}
function enableScroll() {
	console.log('enable page scroll');
	document
		.querySelector('#Cart-Item-List')
		?.removeEventListener('wheel', (e) => {
			e.preventDefault();
			// e.stopPropagation();
			// e.stopImmediatePropagation();
			return false;
		});
	document
		.querySelector('#Widget-View')
		?.removeEventListener('wheel', lockScroll);
}
function disableScroll() {
	console.log('disable page scroll');
	document.querySelector('#Cart-Item-List')?.addEventListener('wheel', (e) => {
		e.preventDefault();
		// e.stopPropagation();
		// e.stopImmediatePropagation();
		return false;
	});
	document.querySelector('#Widget-View')?.addEventListener('wheel', lockScroll);
}
