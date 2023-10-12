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
import { wrapper } from '../redux/store';
import '../styles/anim8-gradient.css';
import '../styles/dashboard.css';
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-unused-vars
import '../styles/tailwind.css';

if (typeof window !== 'undefined') {
	SuperTokensReact.init(frontendConfig());
}

type CustomAppProps = AppProps & {
	Component: ExtendedPageComponent;
};

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
				if (await Session.attemptRefreshingSession()) {
					location.reload();
				} else {
					window.location.href = '/';
				}
			}
		}
		doRefresh();
	}, [props.pageProps.fromSupertokens]);

	if (props.pageProps.fromSupertokens === 'needs-refresh') {
		return null;
	}

	const protectedPages = [
		'/dashboard',
		'/orders',
		'/products',
		'/site-settings',
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
							<LayoutContainer {...getLayoutContext()}>
								{routerLoading ? (
									<LoadingPage />
								) : (
									<ProtectedPage memberPages={protectedPages}>
										<>
											<Component {...props.pageProps} />
											{(function (d, w, c: 'BrevoConversations') {
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
										</>
									</ProtectedPage>
								)}
							</LayoutContainer>
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
