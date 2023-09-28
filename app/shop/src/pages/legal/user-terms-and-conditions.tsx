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

function UserTermsAndConditions() {
	return (
		<Page className={twMerge(styles.gradient, 'md:pt-16')}>
			<Center>
				<Card className="bg-inverse-soft md:max-w-md">
					<FlexBox className="m-auto">
						<H1 className="text-left">Gras</H1>
						<H3 className="text-primary text-left">
							User Terms And Conditions
						</H3>
						<Small className="max-w-md text-justify">
							The following terms and conditions apply to Users and visitors to
							grascannabis.org.
							<br />
							TBA.
						</Small>
					</FlexBox>
				</Card>
			</Center>
		</Page>
	);
}

UserTermsAndConditions.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default UserTermsAndConditions;

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'],
};
