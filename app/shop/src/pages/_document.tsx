import Document, {
	Head,
	Html,
	Main,
	NextScript,
	type DocumentContext,
} from 'next/document';
import Script from 'next/script';

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;
export default class MainDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const originalRenderPage = ctx.renderPage;
		// Run the React rendering logic synchronously
		ctx.renderPage = () =>
			originalRenderPage({
				// Useful for wrapping the whole react tree
				enhanceApp: (App) => App,
				// Useful for wrapping in a per-page basis
				enhanceComponent: (Component) => Component,
			});

		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
		};
	}
	render() {
		return (
			<Html data-theme="cannabis" className="scroll-smooth">
				<Head title="Grascannabis.org - Cannabis, Delivered.">
					<meta name="Gras App" content="Built by Gras Inc." />
					{/* {process.env.NODE_ENV !== 'production' && (
						<script
							dangerouslySetInnerHTML={{
								__html: noOverlayWorkaroundScript,
							}}
						/>
					)} */}

					{/* <!-- Google Tag Manager --> */}
					<Script
						id="google-tag-manager"
						key="google-tag-manager"
						dangerouslySetInnerHTML={{
							__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WC46C5C2');`,
						}}
					/>
					{/* <!-- End Google Tag Manager --> */}
				</Head>
				<body>
					{/* <!-- Google Tag Manager (noscript) --> */}
					<Script
					dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WC46C5C2"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}} />
					{/* <!-- End Google Tag Manager (noscript) --> */}
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
