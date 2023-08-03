import { SVGAttributes } from 'react';

const PickUpBox = (props: SVGAttributes<SVGElement>) => {
	return (
		<svg {...props} viewBox="0 0 20 15">
			<path d="M2.806 0.776367C1.80023 0.776367 0.945312 1.56617 0.945312 2.56539C0.945312 3.26741 1.37869 3.84918 1.97859 4.14327V11.5332C1.97859 13.014 3.18465 14.2258 4.66669 14.2258H16.3309C17.8097 14.2258 19.019 13.0153 19.019 11.5332V4.141C19.6168 3.84622 20.0485 3.26585 20.0485 2.56539C20.0485 1.56617 19.1936 0.776367 18.1878 0.776367H2.806ZM2.806 1.83153H18.1878C18.659 1.83153 18.9941 2.16358 18.9941 2.56539C18.9941 2.96721 18.659 3.30005 18.1878 3.30005H2.806C2.33475 3.30005 1.99973 2.96721 1.99973 2.56539C1.99973 2.16358 2.33475 1.83153 2.806 1.83153ZM3.03377 4.43061H17.9638V11.5332C17.9638 12.4481 17.2406 13.1707 16.3309 13.1707H4.66669C3.75178 13.1707 3.03377 12.4494 3.03377 11.5332V4.43061ZM13.3539 6.68503C13.2531 6.68774 13.1551 6.72 13.0718 6.77706L9.93876 8.86173L9.19283 7.60899C8.83876 6.98362 7.9057 7.53864 8.28625 8.14826L9.31578 9.87847C9.46999 10.1376 9.80971 10.215 10.061 10.0482L13.6564 7.65499C14.104 7.36473 13.8872 6.66946 13.3539 6.68503V6.68503Z" />
		</svg>
	);
};

export default PickUpBox;
