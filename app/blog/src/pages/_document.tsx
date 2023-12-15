import Document, {
	Head,
	Html,
	Main,
	NextScript,
	type DocumentContext,
} from 'next/document';

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;
export default class MainDocument extends Document {
	// static async getInitialProps(ctx: DocumentContext) {
	// 	const originalRenderPage = ctx.renderPage;

	// 	// Run the React rendering logic synchronously
	// 	ctx.renderPage = () =>
	// 		originalRenderPage({
	// 			// Useful for wrapping the whole react tree
	// 			enhanceApp: (App) => App,
	// 			// Useful for wrapping in a per-page basis
	// 			enhanceComponent: (Component) => Component,
	// 		});

	// 	const initialProps = await Document.getInitialProps(ctx);
	// 	return {
	// 		...initialProps,
	// 	};
	// }

	render() {
		return (
			<Html lang="en" data-theme="cannabis" className="scroll-smooth">
				<Head title="Grascannabis.org - Cannabis, Delivered.">
					<meta name="Gras App" content="Built by Gras Inc." />
					{process.env.NODE_ENV !== 'production' && (
						<script
							dangerouslySetInnerHTML={{
								__html: noOverlayWorkaroundScript,
							}}
						/>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
