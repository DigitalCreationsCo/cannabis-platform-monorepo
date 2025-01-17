import { H1 } from '@gras/ui';

export default function PostTitle({ children }: { children: React.ReactNode }) {
	return (
		<H1 className="text-4xl md:text-7xl leading-tight font-onest font-medium text-inverse drop-shadow-lg mb-4">
			{children}
		</H1>
	);
}
