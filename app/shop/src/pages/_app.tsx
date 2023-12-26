/* eslint-disable prefer-rest-params */
import { shopActions } from '@cd/core-lib';
import {
	LoadingPage,
	ModalProvider,
	ProtectedPage,
	ToastProvider,
	type LayoutContextProps,
	ErrorBoundary,
} from '@cd/ui-lib';
import { type AnyAction } from '@reduxjs/toolkit';
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
import { frontendConfig } from '../config';
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

function App({ Component, ...rest }: CustomAppProps) {
	const { store } = wrapper.useWrappedStore(rest);
	// @ts-ignore
	const persistor = store._persistor;

	const { pageProps } = rest;

	const [routerLoading, setRouterLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		router.isReady && setRouterLoading(false);
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

	useEffect(() => {
		!store.getState().shop.isLoading &&
			store.getState().shop.dispensaries.length === 0 &&
			store.dispatch(
				shopActions.getInitialDispensaries() as unknown as AnyAction,
			);
	}, [store]);

	if (pageProps.fromSupertokens === 'needs-refresh') {
		return null;
	}

	const getLayoutContext = (): LayoutContextProps => ({
		TopBarComponent: TopBar,
		...(Component.getLayoutContext && Component.getLayoutContext()),
	});

	return (
		<>
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			<SuperTokensWrapper>
				<ReduxProvider store={store}>
					<PersistGate persistor={persistor} loading={<LoadingPage />}>
						<LocationProvider />
						<ModalProvider />
						<ToastProvider />
						<AnimatePresence
							mode="wait"
							initial={false}
							onExitComplete={() => window.scrollTo(0, 0)}
						>
							{routerLoading ? (
								<LoadingPage />
							) : (
								<LayoutContainer {...getLayoutContext()}>
									<ErrorBoundary>
										<ProtectedPage
											protectedPages={[
												'/settings',
												'/checkout',
												// '/orders',
												'/account',
											]}
										>
											<>
												<Component {...pageProps} />
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
										</ProtectedPage>
									</ErrorBoundary>
								</LayoutContainer>
							)}
						</AnimatePresence>
					</PersistGate>
				</ReduxProvider>
			</SuperTokensWrapper>
		</>
	);
}

export default wrapper.withRedux(App);
