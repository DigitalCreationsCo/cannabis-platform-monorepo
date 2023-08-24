import { useOnClickOutside } from '@cd/ui-lib/src/hooks/index';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import styles from '../styles/theme';
import { type ViewComponent, type ViewProps } from '../types';

const View = (ViewComponent: ViewComponent, props: ViewProps) => {
	function _View(props: ViewProps) {
		const ref = useRef(null);
		useOnClickOutside(ref, () => props.setExpand(false));
		return (
			<div
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
