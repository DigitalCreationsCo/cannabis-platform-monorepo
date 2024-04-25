import Document, { Head, Html, Main, NextScript } from 'next/document';

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;
export default class MainDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
		};
	}

	render() {
		return (
			<Html data-theme="cannabis" className="scroll-smooth">
				<Head title="Gras Cannabis">
					<meta name="Dispensary Backend" content="Built by Gras Inc." />
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
