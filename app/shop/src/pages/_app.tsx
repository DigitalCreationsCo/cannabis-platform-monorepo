/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-rest-params */
import {
	LoadingPage,
	ModalProvider,
	ProtectedPage,
	ToastProvider,
	type LayoutContextProps,
	ErrorBoundary,
	SearchField,
} from '@cd/ui-lib';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence } from 'framer-motion';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { LayoutContainer, LocationProvider, TopBar } from '../components';
import { frontendConfig } from '../config/frontendConfig';
import { wrapper } from '../store';
import '../styles/anim8-gradient.css';
import '../styles/shop.css';
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-unused-vars
import '../styles/tailwind.css';

if (typeof window !== 'undefined') {
	SuperTokensReact.init(frontendConfig() as any);
}

export type PageComponent = {
	getLayoutContext?: () => LayoutContextProps;
};

export interface SupertokensProps {
	fromSupertokens: string;
}

type CustomAppProps = AppProps<SupertokensProps> & {
	Component: PageComponent;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);

function App({ Component, ...rest }: CustomAppProps) {
	const { store } = wrapper.useWrappedStore(rest);
	// @ts-ignore
	const persistor = store._persistor;

	const { pageProps } = rest;

	const [routerLoading, setRouterLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			setRouterLoading(false);
		}
	}, [router.isReady]);

	useEffect(() => {
		async function doRefresh() {
			if (pageProps.fromSupertokens === 'needs-refresh') {
				console.info('needs refresh');
				if (await Session.attemptRefreshingSession()) {
					location.reload();
				} else {
					// user has been logged out
					window.location.href = '/';
				}
			}
		}
		doRefresh();
	}, [pageProps.fromSupertokens]);

	if (pageProps.fromSupertokens === 'needs-refresh') {
		return null;
	}

	const getLayoutContext = (): LayoutContextProps => ({
		TopBarComponent: TopBar,
		SearchComponent: SearchField,
		showSearch: false,
		showLocation: false,
		onSearchChange: () => null,
		...(Component.getLayoutContext && Component.getLayoutContext()),
	});

	return (
		<>
			{/* <!-- Google Tag Manager --> */}
			{typeof window !== 'undefined' &&
				(function (w, d, s: 'script', l: 'dataLayer', i: string) {
					w[l] = w[l] || [];
					w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
					const f = d.getElementsByTagName(s)[0],
						j = d.createElement(s),
						dl = l != 'dataLayer' ? '&l=' + l : '';
					j.async = true;
					j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
					f.parentNode?.insertBefore(j, f);
				})(window, document, 'script', 'dataLayer', 'GTM-WC46C5C2')}
			{/* <!-- End Google Tag Manager --> */}

			<GrasHeadTags />

			<SuperTokensWrapper>
				<ReduxProvider store={store}>
					<PersistGate persistor={persistor} loading={<LoadingPage />}>
						<ModalProvider />
						<LocationProvider />
						<ToastProvider />
						<Elements
							stripe={stripePromise}
							options={{
								mode: 'setup',
								currency: 'usd',
								setup_future_usage: 'off_session',
							}}
						>
							<AnimatePresence
								mode="wait"
								initial={false}
								onExitComplete={() => window.scrollTo(0, 0)}
							>
								{routerLoading ? (
									<LoadingPage />
								) : (
									<LayoutContainer {...getLayoutContext()}>
										<ProtectedPage
											protectedPages={[
												'/settings',
												'/checkout',
												// '/orders',
												'/account',
											]}
										>
											<ErrorBoundary>
												<>
													<Component {...pageProps} />

													{/* // <!-- Google Tag Manager (noscript) --> */}
													{!routerLoading && (
														<noscript>
															<iframe
																title="google-tag-manager-noscript"
																src="https://www.googletagmanager.com/ns.html?id=GTM-WC46C5C2"
																height="0"
																width="0"
																style={{
																	display: 'none',
																	visibility: 'hidden',
																}}
															></iframe>
														</noscript>
													)}

													{!routerLoading &&
														(function (d, w, c: 'BrevoConversations') {
															w.BrevoConversationsID =
																process.env.NEXT_PUBLIC_BREVO_CONVERSATIONS_ID;
															w[c] =
																w[c] ||
																function (...args: any[]) {
																	(w[c].q = w[c].q || []).push(...args);
																};
															const s = d.createElement('script');
															s.async = true;
															s.src =
																'https://conversations-widget.brevo.com/brevo-conversations.js';
															if (d.head) d.head.appendChild(s);
														})(document, window, 'BrevoConversations')}

													{process.env.NODE_ENV === 'production' &&
														!routerLoading &&
														(function (
															h,
															o,
															t,
															j,
															a: HTMLHeadElement | undefined,
															r: HTMLScriptElement | undefined,
														) {
															h.hj =
																h.hj ||
																function (...args: any[]) {
																	(h.hj.q = h.hj.q || []).push(...args);
																};
															h._hjSettings = { hjid: 3708421, hjsv: 6 };
															a = o.getElementsByTagName('head')[0];
															r = o.createElement('script');
															r.async = Boolean(1);
															r.src =
																t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
															a.appendChild(r);
														})(
															window,
															document,
															'https://static.hotjar.com/c/hotjar-',
															'.js?sv=',
															undefined,
															undefined,
														)}
												</>
											</ErrorBoundary>
										</ProtectedPage>
									</LayoutContainer>
								)}
							</AnimatePresence>
						</Elements>
					</PersistGate>
				</ReduxProvider>
			</SuperTokensWrapper>
		</>
	);
}

export default wrapper.withRedux(App);

const GrasHeadTags = () => (
	<Head>
		{/* <!-- HTML Meta Tags --> */}
		<title>Grascannabis.org - Cannabis, Delivered.</title>
		<meta name="Gras App" content="Built by Gras Cannabis Co." />
		<meta
			name="description"
			content="Delivering in the New York City metropolitan area"
		></meta>

		{/* <!-- Facebook Meta Tags --> */}
		<meta property="og:url" content="https://grascannabis.org"></meta>
		<meta property="og:type" content="website"></meta>
		<meta
			property="og:title"
			content="Grascannabis.org - Cannabis, Delivered."
		></meta>
		<meta
			property="og:description"
			content="Delivering in the New York City metropolitan area"
		></meta>
		<meta
			property="og:image"
			content="https://storage.googleapis.com/38d6acd65b23d751-image-dispensary/gras/Gras%20(2).png"
		></meta>

		{/* <!-- Twitter Meta Tags --> */}
		<meta name="twitter:card" content="summary_large_image"></meta>
		<meta property="twitter:domain" content="grascannabis.org"></meta>
		<meta property="twitter:url" content="https://grascannabis.org"></meta>
		<meta
			name="twitter:title"
			content="Grascannabis.org - Cannabis, Delivered."
		></meta>
		<meta
			name="twitter:description"
			content="Delivering in the New York City metropolitan area"
		></meta>
		<meta
			name="twitter:image"
			content="https://storage.googleapis.com/38d6acd65b23d751-image-dispensary/gras/Gras%20(2).png"
		></meta>

		{/* <!-- Meta Tags Generated via https://opengraph.dev --> */}
	</Head>
);
