import { TextContent } from '@cd/core-lib';
import { Button, H2, Page, type LayoutContextProps } from '@cd/ui-lib';
import Link from 'next/link';

function Settings() {
	return (
		<Page>
			<H2>Dashboard Settings</H2>
			<Link href={TextContent.href['site-settings']}>
				<Button>Site Settings</Button>
			</Link>
		</Page>
	);
}

export default Settings;

Settings.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});
