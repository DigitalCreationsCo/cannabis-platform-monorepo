import newrelic from 'newrelic';
import Document, {
	type DocumentContext,
	type DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';

// asynchronously inject new relic browser agent
// https://nextjs.org/docs/pages/building-your-application/routing/custom-document#customizing-renderpage

class RootDocument extends Document {
	static override async getInitialProps(
		context: DocumentContext
	): Promise<DocumentInitialProps & { browserTimingHeader: any }> {
		const initialProps = await Document.getInitialProps(context);

		if (newrelic.agent.collector.isConnected() === false) {
			await new Promise((resolve) => {
				newrelic.agent.on('connected', resolve);
			});
		}

		const browserTimingHeader = newrelic.getBrowserTimingHeader({
			hasToRemoveScriptWrapper: true,
			allowTransactionlessInjection: true,
		});

		return {
			...initialProps,
			browserTimingHeader,
		};
	}

	override render() {
		return (
			<Html lang="en" className="h-full scroll-smooth" data-theme="cannabis">
				<Head>
					<script
						type="text/javascript"
						// The body of the script element comes from the async evaluation
						// of `getInitialProps`. We use the special
						// `dangerouslySetInnerHTML` to provide that element body. Since
						// it requires an object with an `__html` property, we pass in an
						// object literal.
						dangerouslySetInnerHTML={{
							__html: (this.props as any).browserTimingHeader,
						}}
					/>
				</Head>
				<body className="h-full">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default RootDocument;
