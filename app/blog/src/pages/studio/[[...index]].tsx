import { type LayoutContextProps } from '@cd/ui-lib';
import { NextStudio } from 'next-sanity/studio';
import { metadata } from 'next-sanity/studio/metadata';
import Head from 'next/head';
import config from '../../../sanity.config';

export default function StudioPage() {
	return (
		<>
			<Head>
				{Object.entries(metadata).map(([key, value]) => (
					<meta key={key} name={key} content={value} />
				))}
			</Head>
			<div className="w-full max-h-fit">
				<NextStudio config={config} unstable_globalStyles />
			</div>
		</>
	);
}

StudioPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
	showFooter: false,
});
