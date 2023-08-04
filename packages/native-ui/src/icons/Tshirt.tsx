import { type SVGAttributes } from 'react';

const Tshirt = (props: SVGAttributes<SVGElement>) => {
	return (
		<svg
			{...props}
			viewBox="0 0 18 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_33_5483)">
				<path
					d="M17.9915 6.04063C17.952 5.59414 17.7745 5.19477 17.4906 4.91492L13.694 1.16797C13.2553 0.737305 12.7069 0.5 12.1247 0.5H5.84999C5.29199 0.5 4.74356 0.737305 4.30678 1.16797L0.509342 4.91562C0.225364 5.19336 0.0478395 5.59414 0.0082902 6.04063C-0.0312535 6.485 0.0715714 6.92164 0.297415 7.27039L1.70282 9.43637C2.16773 10.155 3.01851 10.2696 3.59591 9.69786L4.50013 8.80559V16.25C4.50013 17.491 4.85788 18.5 5.82481 18.5H11.6495C12.6417 18.5 13.4242 17.491 13.4242 16.25V8.80742L14.3284 9.69898C14.9066 10.2731 15.7574 10.1567 16.2215 9.43862L17.6269 7.27194C17.9297 6.92305 18.0309 6.48711 17.9915 6.04063ZM10.7353 1.625C10.5356 2.59285 9.8353 3.3125 8.99999 3.3125C8.16468 3.3125 7.46436 2.59285 7.26468 1.625H10.7353ZM17.0044 6.56094L15.5989 8.72797C15.4434 8.96967 15.156 9.00539 14.9628 8.81368L12.6011 6.48458V16.25C12.6011 16.8702 12.1978 17.375 11.7264 17.375H5.84999C5.35331 17.375 5.4253 16.8702 5.4253 16.25V6.48711L3.0375 8.81445C2.84239 9.00781 2.55684 8.9677 2.40131 8.72765L0.995904 6.56097C0.92306 6.44844 0.889873 6.30781 0.903092 6.16367C0.916274 6.01922 0.974276 5.88847 1.06655 5.79734L4.86342 2.04969C5.14124 1.77652 5.4928 1.625 5.84999 1.625H6.34555C6.56155 3.21793 7.66405 4.4375 8.99999 4.4375C10.3359 4.4375 11.4387 3.21793 11.6544 1.625H12.1491C12.5069 1.625 12.8576 1.77659 13.136 2.05109L16.9329 5.79875C17.0252 5.89047 17.0832 6.02122 17.0964 6.16578C17.1112 6.30781 17.0775 6.44844 17.0044 6.56094Z"
					fill="currentColor"
				/>
			</g>

			<defs>
				<clipPath id="clip0_33_5483">
					<rect
						width="18"
						height="18"
						fill="currentColor"
						transform="translate(0 0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default Tshirt;
