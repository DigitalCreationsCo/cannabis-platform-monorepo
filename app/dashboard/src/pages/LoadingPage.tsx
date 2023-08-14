import { Center, FlexBox, type LayoutContextProps } from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';

function LoadingPage() {
	const dot = 'animate-bounce w-[12px] h-[12px] rounded-full bg-primary';
	return (
		<FlexBox className="min-h-screen grow items-center">
			<Center>
				<span className={twMerge('flex space-x-2 items-center rounded-full')}>
					<span className={twMerge(dot, 'bg-secondary')} />
					<span
						className={twMerge(dot, 'animate-[bounce_1s_0.15s_infinite]')}
					/>
					<span className={twMerge(dot, 'animate-[bounce_1s_0.3s_infinite]')} />
				</span>
			</Center>
		</FlexBox>
	);
}

export default LoadingPage;

LoadingPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});
