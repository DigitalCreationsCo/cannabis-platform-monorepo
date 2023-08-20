import {
	Card,
	Center,
	FlexBox,
	H1,
	H3,
	Page,
	Small,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';

function DispensaryTermsAndConditions() {
	return (
		<Page className={twMerge(styles.gradient)}>
			<Center>
				<Card className="bg-inverse-soft md:max-w-md">
					<FlexBox className="m-auto">
						<H1 className="text-left">Gras</H1>
						<H3 className="text-primary text-left">
							Dispensary Terms And Conditions
						</H3>
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

DispensaryTermsAndConditions.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default DispensaryTermsAndConditions;

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'],
};
