import { SVGAttributes } from 'react';

const Shirt = (props: SVGAttributes<SVGElement>) => {
	return (
		<svg
			{...props}
			viewBox="0 0 18 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_33_5491)">
				<path
					d="M17.5416 6.75078L15.5438 2.29297C15.0469 1.1866 14.1103 0.5 13.0978 0.5H4.90219C3.88969 0.5 2.92781 1.1866 2.45644 2.29191L0.458719 6.75078C0.159075 7.41875 0 8.17813 0 8.94805V13.4375C0 14.3691 0.605531 15.125 1.35 15.125H2.25C2.99531 15.125 3.6 14.3691 3.6 13.4375V9.55273L4.5 7.78051V16.8125C4.5 17.7441 5.10469 18.5 5.85 18.5H12.15C12.8945 18.5 13.5 17.7431 13.5 16.8125V7.7668L14.4 9.52672V13.4375C14.4 14.3681 15.0055 15.125 15.75 15.125H16.65C17.3945 15.125 18 14.3681 18 13.4375V8.94805C18 8.17813 17.8397 7.41875 17.5416 6.75078ZM10.7353 1.625C10.5356 2.59285 9.83531 3.3125 9 3.3125C8.16469 3.3125 7.46437 2.59285 7.26469 1.625H10.7353ZM17.1 13.4375C17.1 13.7479 16.8978 14 16.65 14H15.75C15.5022 14 15.3 13.7479 15.3 13.4375V9.36289C15.3 9.25577 15.2754 9.1503 15.2288 9.06023L13.4288 5.54109C13.3216 5.33072 13.1169 5.23456 12.9234 5.30435C12.7322 5.37266 12.6 5.59414 12.6 5.84375V16.8125C12.6 17.1229 12.3978 17.375 12.15 17.375H5.85C5.6025 17.375 5.4 17.1219 5.4 16.8125V5.84375C5.4 5.59382 5.26815 5.37336 5.07572 5.30375C5.03437 5.28828 4.99219 5.28125 4.95 5.28125C4.79883 5.28125 4.65384 5.37684 4.57031 5.54218L2.77031 9.08593C2.72475 9.17656 2.7 9.28203 2.7 9.3875V13.4375C2.7 13.7469 2.49778 14 2.25 14H1.35C1.10222 14 0.9 13.7469 0.9 13.4375V8.94805C0.9 8.37113 1.01866 7.8016 1.24453 7.29887L3.24281 2.84176C3.58031 2.09152 4.21594 1.625 4.90219 1.625H6.33741C6.52781 3.21898 7.66406 4.4375 9 4.4375C10.3359 4.4375 11.4477 3.21898 11.6623 1.625H13.0975C13.7849 1.625 14.4211 2.09152 14.7577 2.84105L16.7555 7.29887C16.7555 7.29942 16.7555 7.29887 16.7555 7.29887C16.9819 7.80195 17.1 8.37148 17.1 8.94805V13.4375Z"
					fill="currentColor"
				/>
			</g>
			<defs>
				<clipPath id="clip0_33_5491">
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

export default Shirt;
