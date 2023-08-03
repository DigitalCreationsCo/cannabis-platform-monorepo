import { CheckAge, Page } from '@cd/ui-lib';
import { useRouter } from 'next/router';

function Welcome() {
	const router = useRouter();
	const redirect = (router.query.redirect as string) || '/';
	return (
		<Page>
			<CheckAge redirect={redirect} />
		</Page>
	);
}

export default Welcome;
