import {
	LoadingPage,
	ModalProvider,
	ToastProvider,
	type LayoutContextProps,
	PlainTopBar as TopBar,
} from '@cd/ui-lib';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LayoutContainer } from '../components';
import { wrapper } from '../redux/store';
import '../styles/anim8-gradient.css';
import '../styles/pricing-tool.css';
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-unused-vars
import '../styles/tailwind.css';

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

	const getLayoutContext = (): LayoutContextProps => ({
		TopBarComponent: TopBar,
		...(Component.getLayoutContext && Component.getLayoutContext()),
	});

	return (
		<>
			<Head>
				<title>Pricing - by Gras</title>
				<meta name="Pricing Tool" content="Built by Gras Cannabis Co." />
			</Head>
			<ReduxProvider store={store}>
				<PersistGate persistor={persistor} loading={<LoadingPage />}>
					<ToastProvider />
					<ModalProvider />
					<AnimatePresence
						mode="wait"
						initial={false}
						onExitComplete={() => window.scrollTo(0, 0)}
					>
						<LayoutContainer {...getLayoutContext()}>
							{routerLoading ? (
								<LoadingPage />
							) : (
								<Component {...props.pageProps} />
							)}
						</LayoutContainer>
					</AnimatePresence>
				</PersistGate>
			</ReduxProvider>
		</>
	);
}

export default wrapper.withRedux(App);

export type ExtendedPageComponent = {
	getLayoutContext?: () => LayoutContextProps;
};
