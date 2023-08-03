import {
	Card,
	Center,
	H1,
	H2,
	type LayoutContextProps,
	Page,
	Small
} from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';

function DispensaryTermsAndConditions() {
	return (
		<Page className={twMerge(styles.gradient, 'md:pt-16')}>
			<Center>
				<Card>
					<H2 className="text-left">Gras</H2>
					<H1 className="text-left">
						Dispensary Terms And Conditions
					</H1>
					<Small className="text-justify">
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
						Insert terms and conditions here. Insert terms and
						conditions here. Insert terms and conditions here.
					</Small>
				</Card>
			</Center>
		</Page>
	);
}

DispensaryTermsAndConditions.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false
});

export default DispensaryTermsAndConditions;

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary']
};
