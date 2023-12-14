import {
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
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { LayoutContainer, TopBar } from '../components';
import { frontendConfig } from '../config/frontendConfig';
import { wrapper } from '../redux/store';
import '../styles/anim8-gradient.css';
import '../styles/blog.css';
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-unused-vars
import '../styles/tailwind.css';

if (typeof window !== 'undefined') {
	SuperTokensReact.init(frontendConfig() as any);
}

export interface SharedPageProps {
	draftMode: boolean;
	token: string;
}

type CustomAppProps = AppProps & {
	Component: ExtendedPageComponent;
} & SharedPageProps;

function App({ Component, ...rest }: CustomAppProps) {
	const { store, props } = wrapper.useWrappedStore(rest);

	// @ts-ignore
	const persistor = store._persistor;

	const [routerLoading, setRouterLoading] = useState(true),
		router = useRouter();

	useEffect(() => {
		router.isReady && setRouterLoading(false);
	}, [router]);

	useEffect(() => {
		async function doRefresh() {
			if (props.pageProps.fromSupertokens === 'needs-refresh') {
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
	}, [props.pageProps.fromSupertokens]);

	if (props.pageProps.fromSupertokens === 'needs-refresh') {
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
						<ToastProvider />
						<ModalProvider />
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
											'/orders',
											'/account',
										]}
									>
										<>
											<Component {...props.pageProps} />
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
											{!routerLoading &&
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
	fromSupertokens: string;
};
