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

const PrivacyPolicy = () => {
	return (
		<Page className={twMerge(styles.gradient, 'md:pt-16')}>
			<Center>
				<Card className="bg-inverse-soft md:max-w-md">
					<FlexBox className="m-auto">
						<H1 className="text-left">Gras</H1>
						<H3 className="text-primary text-left">Our Privacy Policy</H3>
						<Small className="max-w-md text-justify">
							Gras respects and secures the private information of the
							businesses, people, entities, employees, and partners that do
							business with us. Gras will never share your information with
							other entities, or with any outside entities. We will never sell
							your information. We abide by all applicable privacy and
							information security laws.
						</Small>
					</FlexBox>
				</Card>
			</Center>
		</Page>
	);
};

PrivacyPolicy.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default PrivacyPolicy;

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'],
};
