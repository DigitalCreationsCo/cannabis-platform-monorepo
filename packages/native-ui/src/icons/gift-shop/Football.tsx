import { type SVGAttributes } from 'react';

const Football = (props: SVGAttributes<SVGElement>) => {
	return (
		<svg {...props} viewBox="0 0 19 19" fill="none">
			<path
				d="M6.10967 0.698636C4.99317 1.1513 3.99133 1.81686 3.13226 2.67567C2.27294 3.53473 1.60811 4.53681 1.1552 5.65304C0.717951 6.73147 0.496094 7.87108 0.496094 9.04004C0.496094 10.2088 0.717951 11.3484 1.1552 12.4263C1.60811 13.5428 2.27319 14.5448 3.13226 15.4037C3.99133 16.263 4.99292 16.928 6.10967 17.3807C7.18811 17.8184 8.32749 18.0395 9.49647 18.0395C10.6654 18.0395 11.8046 17.8177 12.883 17.3807C13.9993 16.928 15.0016 16.263 15.8604 15.4037C16.7197 14.5448 17.3848 13.5433 17.8375 12.4263C18.2747 11.3484 18.4961 10.2088 18.4961 9.04004C18.4961 7.87108 18.2745 6.73147 17.8375 5.65304C17.3848 4.53681 16.7192 3.53448 15.8604 2.67567C15.0016 1.81686 14.0003 1.1513 12.883 0.698636C11.8046 0.261644 10.6654 0.0400391 9.49647 0.0400391C8.32749 0.0400391 7.18811 0.261644 6.10967 0.698636ZM2.7455 12.8287C2.31199 12.5566 1.91254 12.2432 1.55887 11.8741C1.01865 10.354 0.927123 8.70825 1.28503 7.14607C1.45341 6.81404 1.64492 6.49519 1.86156 6.18977C1.92846 6.0955 1.99039 5.99726 2.06202 5.90573L4.09306 7.10752C4.09306 7.12344 4.09306 7.14085 4.09306 7.15851C4.08784 8.25087 4.19876 9.33526 4.41963 10.404C4.42037 10.409 4.42112 10.4117 4.42211 10.4162L2.84698 12.8859C2.81266 12.8685 2.77858 12.8496 2.7455 12.8287ZM8.78439 17.0039C9.13483 17.1827 9.49522 17.3337 9.86556 17.4566C8.29242 17.525 6.70361 17.1564 5.29909 16.3505L8.7038 16.9571C8.72992 16.9738 8.75653 16.9897 8.78439 17.0039ZM8.77195 16.3893L4.75415 15.6733C4.28408 15.1025 3.86125 14.4986 3.49788 13.8532C3.40535 13.689 3.30213 13.5296 3.22379 13.3582L4.79743 10.891C4.83225 10.8997 4.87105 10.9089 4.91507 10.9206C5.8995 11.184 6.90134 11.3712 7.91014 11.518C7.96909 11.5262 8.01833 11.5334 8.06037 11.5379L9.94665 14.7993C9.61933 15.2594 9.28829 15.717 8.95003 16.1697C8.89382 16.2451 8.83413 16.3174 8.77195 16.3893ZM15.4565 15C15.1367 15.3201 14.7972 15.6086 14.4417 15.8658C14.3828 15.3947 14.2811 14.9331 14.1376 14.4822L16.1502 10.7276C16.7046 10.4751 17.2393 10.1889 17.7358 9.83394C17.8007 9.78792 17.8546 9.73644 17.8964 9.68023C17.7507 11.6205 16.9374 13.5194 15.4565 15ZM15.3672 10.1307C15.4421 10.2734 15.5159 10.4177 15.5901 10.5639L13.6461 14.1902C13.6349 14.1927 13.6242 14.1952 13.613 14.1966C12.5622 14.3929 11.5029 14.4973 10.4346 14.5023L8.49463 11.1479C8.79657 10.5873 9.09578 10.0245 9.3925 9.46136C9.59396 9.07934 9.79194 8.69482 9.98967 8.31056L14.0047 7.89819C14.4965 8.61946 14.9623 9.35616 15.3672 10.1307ZM14.5527 5.82938C14.3621 6.33253 14.1582 6.83046 13.9555 7.32938L10.0441 7.73105C9.99739 7.66937 9.94888 7.60868 9.8979 7.55073C9.43603 7.02769 8.97117 6.50787 8.50706 5.98657C8.51129 5.98134 8.51552 5.97736 8.51975 5.97264C8.33246 5.7856 8.14468 5.59857 7.9574 5.41104L9.04629 2.13273C9.1214 2.11283 9.19701 2.09617 9.27337 2.08796C9.86532 2.02777 10.458 1.95962 11.0515 1.9253C11.4148 1.9049 11.7802 1.89321 12.1498 1.91933L14.8439 4.95589C14.7511 5.24888 14.6606 5.54261 14.5527 5.82938ZM15.4565 3.07958C16.1997 3.82324 16.7752 4.67186 17.1821 5.57842C16.6787 5.23196 16.1405 4.94694 15.5746 4.71464C15.4866 4.67832 15.3963 4.64624 15.3045 4.61465L12.6527 1.62585C12.6711 1.49676 12.6808 1.36743 12.6848 1.2371C13.6936 1.64773 14.6392 2.26256 15.4565 3.07958ZM6.79713 1.08017C6.80757 1.08788 6.81255 1.09434 6.81852 1.09608C7.42464 1.3055 7.97605 1.61391 8.49587 1.97977L7.47861 5.04319C7.47339 5.04468 7.46842 5.04617 7.46344 5.04841C7.25526 5.13447 7.04311 5.21157 6.83816 5.30484C5.99377 5.6886 5.17051 6.11366 4.395 6.62328L2.3876 5.43566C2.39058 5.37299 2.40128 5.30931 2.42267 5.25261C2.55747 4.89346 2.69004 4.53233 2.8425 4.1804C2.9599 3.9093 3.09371 3.6474 3.23971 3.39147C3.33521 3.28602 3.4342 3.18156 3.53618 3.07958C4.48952 2.12651 5.61621 1.44976 6.81578 1.04957C6.80956 1.05927 6.80309 1.06947 6.79713 1.08017Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default Football;
