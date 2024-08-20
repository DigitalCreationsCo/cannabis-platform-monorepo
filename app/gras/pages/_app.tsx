import { AccountLayout } from '@/components/layouts';
import { type AppPropsWithLayout } from '@/lib/next.types';
import { wrapper } from '@/lib/store';
import { Themer } from '@boxyhq/react-ui/shared';
import { axios } from '@cd/core-lib';
import CacheProvider from '@cd/core-lib/lib/cache';
import {
	GTMTag,
	loadGoogleTagManager,
} from '@cd/core-lib/lib/googletagmanager';
import { loadHotJar } from '@cd/core-lib/lib/hotjar/hotjar-gras';
import {
	ErrorBoundary,
	LoadingPage,
	ModalProvider,
	ToastProvider,
} from '@cd/ui-lib';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SWRConfig } from 'swr';

import '../styles/tailwind.css';
import seoConfig from '@/lib/seo.config';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);

export interface SharedPageProps {
	draftMode: boolean;
	token: string;
	isRouteChanging?: boolean;
}

async function fetchEnvConfig() {
	try {
		const response = await axios('/api/env');
		return response.data;
	} catch (error) {
		console.error('Failed to fetch environment config:', error);
		return {};
	}
}

function MyApp({
	Component,
	...appProps
}: AppPropsWithLayout & { pageProps: SharedPageProps }) {
	const { store } = wrapper.useWrappedStore(appProps);
	// @ts-expect-error - persistor is not a property of store
	const persistor = store._persistor;

	const { pageProps } = appProps;
	const { session, ...props } = pageProps;

	const router = useRouter();
	const [isRouteChanging, setIsRouteChanging] = useState(false);

	useEffect(() => {
		// Set up route change event listeners and update state
		const handleRouteChange = (url) => {
			console.log(`Route changed to: ${url}`);
			setIsRouteChanging(true);
		};
		const handleRouteChangeComplete = (url) => {
			console.log(`Route changed to: ${url}`);
			setIsRouteChanging(false);
		};

		router.events.on('routeChangeComplete', handleRouteChangeComplete);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router]);

	// // add env config to redux state
	// useEffect(() => {
	// 	async function initializeApp() {
	// 		const envConfig = await fetchEnvConfig();
	// 		dispatch(setEnv(envConfig));
	// 	}
	// 	initializeApp();
	// }, []);

	// Add mixpanel
	// useEffect(() => {
	// 	if (env.mixpanel.token) {
	// 		mixpanel.init(env.mixpanel.token, {
	// 			debug: true,
	// 			ignore_dnt: true,
	// 			track_pageview: true,
	// 			persistence: 'localStorage',
	// 		});
	// 	}

	// 	if (env.darkModeEnabled) {
	// 		applyTheme(localStorage.getItem('theme') as Theme);
	// 	}
	// }, []);

	const getLayout =
		Component.getLayout || ((page) => <AccountLayout>{page}</AccountLayout>);

	return (
		<>
			<>
				{/* {loadBrevoChat()} */}
				{/* {loadSegment()} */}
				{loadGoogleTagManager()}
				{loadHotJar()}
				<GTMTag />
				<NextSeo {...seoConfig} />
			</>
			<SWRConfig
				value={{
					revalidateOnFocus: false,
					provider: CacheProvider,
				}}
			>
				<ErrorBoundary>
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
									//   '--primary-color': colors.blue['500'],
									//   '--primary-hover': colors.blue['600'],
									//   '--primary-color-50': colors.blue['50'],
									//   '--primary-color-100': colors.blue['100'],
									//   '--primary-color-200': colors.blue['200'],
									//   '--primary-color-300': colors.blue['300'],
									//   '--primary-color-500': colors.blue['500'],
									//   '--primary-color-600': colors.blue['600'],
									//   '--primary-color-700': colors.blue['700'],
									//   '--primary-color-800': colors.blue['800'],
									//   '--primary-color-900': colors.blue['900'],
									//   '--primary-color-950': colors.blue['950'],
									// }}
									>
										<AnimatePresence
											mode="wait"
											initial={false}
											// onExitComplete={() => window.scrollTo(0, 0)}
										>
											{getLayout(
												<Component
													{...props}
													isRouteChanging={isRouteChanging}
												/>
											)}
										</AnimatePresence>
									</Themer>
								</Elements>
							</PersistGate>
						</ReduxProvider>
					</SessionProvider>
				</ErrorBoundary>
			</SWRConfig>
		</>
	);
}

export default appWithTranslation<never>(MyApp);

// Remaining code...

// MyApp.getInitialProps = wrapper.getInitialAppProps(
// 	(store) => async (context) => {
// 		const appProps = await App.getInitialProps(context);

// 		console.info('is server? ', typeof window === 'undefined');
// 		console.info('store ', store);
// 		// if (!cachedLeftNav) {
// 		//   try {
// 		// 	const response = await axios.get('/api/left-nav');
// 		// 	cachedLeftNav = response?.data?.leftNav ?? null;
// 		// 	store.dispatch(setLeftNav(cachedLeftNav));
// 		//   } catch (error) {
// 		// 	console.error('Failed to fetch left nav:', error);
// 		// 	cachedLeftNav = null;
// 		//   }
// 		// }

// 		return {
// 			...appProps,
// 		};
// 	}
// );
