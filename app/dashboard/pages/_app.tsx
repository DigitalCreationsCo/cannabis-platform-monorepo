import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { Themer } from '@boxyhq/react-ui/shared';
import { loadBrevoChat } from '@cd/core-lib/src/lib/brevoChat';
import {
	GTMTag,
	loadGoogleTagManager,
} from '@cd/core-lib/src/lib/googletagmanager';
import { loadHotJar } from '@cd/core-lib/src/lib/hotjar';
import {
	LoadingPage,
	ModalProvider,
	ToastProvider,
	type Theme,
	applyTheme,
	Footer,
} from '@cd/ui-lib';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence } from 'framer-motion';
import mixpanel from 'mixpanel-browser';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AccountLayout } from '@/components/layouts';
import app from '@/lib/app';
import env from '@/lib/env';
import { type AppPropsWithLayout } from '@/lib/next.types';
import { wrapper } from '@/lib/store';
import { loadSegment } from '@cd/core-lib/src/lib/segment';

import colors from 'tailwindcss/colors';
import '../styles/dashboard.css';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_API_KEY as string
);

function MyApp({ Component, ...appProps }: AppPropsWithLayout) {
	const { store } = wrapper.useWrappedStore(appProps);
	// @ts-expect-error - persistor is not a property of store
	const persistor = store._persistor;

	const { pageProps } = appProps;
	const { session, ...props } = pageProps;

	// Add mixpanel
	useEffect(() => {
		if (env.mixpanel.token) {
			// eslint-disable-next-line import/no-named-as-default-member
			mixpanel.init(env.mixpanel.token, {
				debug: true,
				ignore_dnt: true,
				track_pageview: true,
				persistence: 'localStorage',
			});
		}

		if (env.darkModeEnabled) {
			applyTheme(localStorage.getItem('theme') as Theme);
		}
	}, []);

	const getLayout =
		Component.getLayout ||
		((page) => (
			<>
				<AccountLayout>{page}</AccountLayout>
				<Footer />
			</>
		));

	return (
		<>
			{loadBrevoChat()}
			{loadSegment()}
			{loadGoogleTagManager()}
			{loadHotJar()}
			<GTMTag />
			<NextSeo
				title={app.name}
				description={app.description}
				openGraph={{
					url: app.url,
					title: app.opengraph.title,
					type: 'website',
					description: app.description,
					images: [{ url: app.opengraph.image, alt: app.name, width: 300 }],
					site_name: app.name,
				}}
				twitter={{
					cardType: 'summary_large_image',
					site: app.url,
					handle: '@grascannabis',
				}}
			/>

			<SessionProvider session={session}>
				<ReduxProvider store={store}>
					<PersistGate persistor={persistor} loading={<LoadingPage />}>
						<ModalProvider />
						<ToastProvider />
						<Elements
							stripe={stripePromise}
							options={{
								mode: 'setup',
								currency: 'usd',
								setup_future_usage: 'off_session',
							}}
						>
							<Themer
								// overrideTheme={{
								// 	'--primary-color': colors.blue['500'],
								// 	'--primary-hover': colors.blue['600'],
								// 	'--primary-color-50': colors.blue['50'],
								// 	'--primary-color-100': colors.blue['100'],
								// 	'--primary-color-200': colors.blue['200'],
								// 	'--primary-color-300': colors.blue['300'],
								// 	'--primary-color-500': colors.blue['500'],
								// 	'--primary-color-600': colors.blue['600'],
								// 	'--primary-color-700': colors.blue['700'],
								// 	'--primary-color-800': colors.blue['800'],
								// 	'--primary-color-900': colors.blue['900'],
								// 	'--primary-color-950': colors.blue['950'],
								// }}
							>
								<AnimatePresence
									mode="wait"
									initial={false}
									onExitComplete={() => window.scrollTo(0, 0)}
								>
									{getLayout(<Component {...props} />)}
								</AnimatePresence>
							</Themer>
						</Elements>
					</PersistGate>
				</ReduxProvider>
			</SessionProvider>
		</>
	);
}

export default wrapper.withRedux(appWithTranslation<never>(MyApp));
