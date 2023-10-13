import { CopyRight, H2, Small } from '@cd/ui-lib';

function PrivacyPolicy() {
	return (
		<div className="md:m-auto">
			<H2 className="text-primary">Our Privacy Policy</H2>
			<Small className="mt-4 max-w-md text-justify">
				Gras respects and secures the private information of the businesses,
				people, entities, employees, and partners that do business with us. Gras
				will never share your information with other entities, or with any
				outside entities. We will never sell your information. We abide by all
				applicable privacy and information security laws.
			</Small>
			<CopyRight />
		</div>
	);
}

export default PrivacyPolicy;
