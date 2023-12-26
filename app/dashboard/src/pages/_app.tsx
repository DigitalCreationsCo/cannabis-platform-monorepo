import {
	ErrorBoundary,
	LoadingPage,
	ModalProvider,
	ProtectedPage,
	ToastProvider,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session, {
	type SessionContextType,
} from 'supertokens-auth-react/recipe/session';
import { LayoutContainer } from '../components';
import DashboardTopBar from '../components/DashboardTopBar';
import { frontendConfig } from '../config/frontendConfig';
import { wrapper } from '../store';
import '../styles/anim8-gradient.css';
import '../styles/dashboard.css';
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

	const [routerLoading, setRouterLoading] = useState(true),
		router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			setRouterLoading(false);
		}
	}, [router.isReady]);

	useEffect(() => {
		async function doRefresh() {
			if (pageProps.fromSupertokens === 'needs-refresh') {
				if (await Session.attemptRefreshingSession()) {
					location.reload();
				} else {
					window.location.href = '/';
				}
			}
		}
		doRefresh();
	}, [pageProps.fromSupertokens]);

	if (pageProps.fromSupertokens === 'needs-refresh') {
		return null;
	}

	const protectedPages = [
		'/dashboard',
		'/orders',
		'/products',
		'/settings',
		'/site-settings',
		'/setup-widget',
		'/users',
	];

	const getLayoutContext = (): LayoutContextProps => ({
		TopBarComponent: DashboardTopBar,
		...(Component.getLayoutContext && Component.getLayoutContext()),
	});

	return (
		<>
			<Head>
				<title>app.grascannabis.org Dashboard</title>
				<meta
					name="Dispensary Experience App"
					content="Built by Gras Cannabis Co."
				/>
			</Head>
			<SuperTokensWrapper>
				<ReduxProvider store={store}>
					<PersistGate persistor={persistor} loading={<LoadingPage />}>
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
									<ProtectedPage memberPages={protectedPages}>
										<ErrorBoundary>
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
										</ErrorBoundary>
									</ProtectedPage>
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

export type ExtendedPageComponent = {
	getLayoutContext?: () => LayoutContextProps;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	session: SessionContextType;
	doesSessionExist: boolean;
	fromSupertokens: string;
};
