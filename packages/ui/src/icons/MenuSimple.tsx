import { type SVGAttributes } from 'react';

const MenuSimple = (props: SVGAttributes<SVGElement>) => {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			className="inline-block stroke-current"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M4 6h16M4 12h16M4 18h16"
			></path>
		</svg>
	);
};

export default MenuSimple;
