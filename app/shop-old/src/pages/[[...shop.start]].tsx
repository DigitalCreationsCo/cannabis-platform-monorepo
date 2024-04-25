import { CheckAge, type LayoutContextProps, Page, H1, H3 } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import friendsVideo from '../../public/Gras-community-clip.mp4';

function Welcome() {
	const router = useRouter();
	const redirect = (router.query.redirect as string) || '/';
	return (
		<Page className={twMerge(styles.gradient, 'text-light p-0 m-0 lg:pt-8')}>
			<div className="mx-auto items-center self-center space-y-4">
				<div>
					<H1 className="text-center">Welcome to Gras</H1>
					<H3 className="text-center">We Help You Enjoy Bud With Your Buds</H3>
				</div>
				<video
					className="w-full sm:max-w-xl lg:max-w-2xl"
					style={{
						// position: 'absolute',
						aspectRatio: 'auto',
						// width: '100%',
						// height: '100%',
						// zIndex: -1,
						objectFit: 'cover',
						objectPosition: '40% 40%',
						left: '0',
						top: '0',
					}}
					src={friendsVideo}
					autoPlay
					loop
					muted
				/>
			</div>
			<CheckAge redirect={redirect} />
		</Page>
	);
}

Welcome.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
});

export default Welcome;

const styles = {
	gradient: [
		'bg-gradient-to-b',
		'from-10%',
		'from-secondary-light',
		'to-secondary',
		'p-0 lg:p-16 h-max',
	],
};
