/* eslint-disable import/no-named-as-default-member */
import Document, {
	type DocumentContext,
	type DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';

class RootDocument extends Document {
	static override async getInitialProps(
		context: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(context);

		return {
			...initialProps,
		};
	}

	override render() {
		return (
			<Html lang="en" className="h-full scroll-smooth" data-theme="cannabis">
				<Head></Head>
				<body className="h-full">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default RootDocument;
