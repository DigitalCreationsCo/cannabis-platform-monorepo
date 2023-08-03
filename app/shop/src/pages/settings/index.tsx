import {
	FlexBox,
	Grid,
	H1,
	type LayoutContextProps,
	Padding,
	Page,
	Paragraph
} from '@cd/ui-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

function SettingsPage() {
	return (
		<Page>
			<FlexBox className="mx-auto w-[80%] sm:w-auto">
				<Padding>
					<H1>Settings</H1>
					<Grid className="grid-rows-auto w-full gap-4 pt-4 sm:grid-cols-3">
						<div
							className={twMerge(
								styles.settings_button,
								styles.active
							)}
						>
							<Link
								href="/settings/account"
								className="flex h-full w-full"
							>
								<Paragraph className="m-auto">
									my account
								</Paragraph>
							</Link>
						</div>
						<div className={twMerge(styles.settings_button)}>
							<Paragraph className="text-gray m-auto">
								address
							</Paragraph>
						</div>
						<div className={twMerge(styles.settings_button)}>
							<Paragraph className="text-gray m-auto">
								order history
							</Paragraph>
						</div>
					</Grid>
				</Padding>
			</FlexBox>
		</Page>
	);
}

const styles = {
	settings_button: 'flex justify-center h-20 w-full sm:w-40 border rounded',
	active: 'hover:shadow'
};

SettingsPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false
});

export default SettingsPage;
