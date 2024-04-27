import { getShopSite, selectUserState } from '@cd/core-lib';
import { Card, H2, Page, type LayoutContextProps } from '@cd/ui-lib';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function ContinueSignUp() {
	const { user } = useSelector(selectUserState),
		{ is_legal_age, id_verified } = user;

	if (id_verified === true && is_legal_age === false)
		router.push(getShopSite('/sorry-we-cant-serve-you'));
	return (
		<Page className={twMerge(styles.gradient, 'pb-0 md:pb-24')}>
			<Card className="bg-inverse-soft m-auto h-full space-y-2">
				<H2 id="verify-id-step-1" className="text-primary">
					Welcome to Gras
				</H2>
				<ContinueSignUp />
			</Card>
		</Page>
	);
}

ContinueSignUp.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default ContinueSignUp;
const styles = {
	gradient: [
		'bg-gradient-to-b',
		'from-primary',
		'to-secondary',
		'p-0 lg:p-16 h-max',
	],
};
