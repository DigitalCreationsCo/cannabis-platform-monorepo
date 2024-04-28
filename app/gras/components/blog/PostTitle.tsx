import { H1 } from '@cd/ui-lib';

export default function PostTitle({ children }: { children: React.ReactNode }) {
	return (
		<H1 className="text-5xl md:text-7xl leading-tight font-onest font-normal text-inverse drop-shadow-lg mb-4">
			{children}
		</H1>
	);
}
