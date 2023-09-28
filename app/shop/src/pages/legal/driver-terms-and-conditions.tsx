import {
	Card,
	Center,
	FlexBox,
	H1,
	H2,
	Page,
	Small,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';

function DriverTermsAndConditions() {
	return (
		<Page className={twMerge(styles.gradient, 'md:pt-16')}>
			<Center>
				<Card className="bg-inverse-soft md:max-w-md">
					<FlexBox className="m-auto">
						<H1 className="text-left">Gras</H1>
						<H2 className="text-primary text-left">
							Dispensary Terms And Conditions
						</H2>
						<Small className="max-w-md text-justify">
							The following terms and conditions apply to Dispensaries working
							within the Gras platform.
							<br />
							TBA.
						</Small>
					</FlexBox>
				</Card>
			</Center>
		</Page>
	);
}

DriverTermsAndConditions.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default DriverTermsAndConditions;

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'],
};
