import { blogActions, shopActions } from '@cd/core-lib/src/reduxDir';
import {
	LoadingPage,
	ModalProvider,
	ToastProvider,
	type LayoutContextProps
} from '@cd/ui-lib';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { LayoutContainer, LocationProvider } from '../components';
import { frontendConfig } from '../config/frontendConfig';
import { wrapper, type AppThunk } from '../redux/store';
import '../styles/anim8-gradient.css';

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

	useEffect(() => {
		!store.getState().shop.isLoading &&
			store.getState().shop.dispensaries.length === 0 &&
			store.dispatch(shopActions.getInitialDispensaries() as AppThunk);
		store.dispatch(blogActions.getLatestNews());
	}, [store]);

	if (props.pageProps.fromSupertokens === 'needs-refresh') {
		return null;
	}

	const getLayoutContext = Component.getLayoutContext || (() => ({}));

	return (
		<>
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			<SuperTokensWrapper>
				<ReduxProvider store={store}>
					<PersistGate
						persistor={persistor}
						loading={<LoadingPage />}
					>
						<LocationProvider />
						<ToastProvider />
						<ModalProvider />
						<LayoutContainer {...getLayoutContext()}>
							{routerLoading ? (
								<LoadingPage />
							) : (
								<Component {...props.pageProps} />
							)}
						</LayoutContainer>
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
