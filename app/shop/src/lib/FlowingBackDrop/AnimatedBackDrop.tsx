import Image, { type StaticImageData } from 'next/image';

export default function AnimatedBackDrop({
	src,
	children,
}: {
	src: string | StaticImageData;
	children: React.ReactNode;
}) {
	return (
		<div
			className="relative flex w-full grow"
			style={{
				clipPath: 'inset(0 0 0 0)',
			}}
		>
			<Image
				priority
				src={src}
				alt=""
				fill
				style={{
					zIndex: -1,
					objectFit: 'cover',
					objectPosition: '40% 40%',
				}}
			/>
			<div
				style={{
					zIndex: -1,
					backgroundColor: 'rgba(0,0,0,0.3)',
					position: 'fixed',
					height: '100%',
					width: '100%',
					left: '0',
					top: '0',
				}}
			></div>
			{children}
		</div>
	);
}
