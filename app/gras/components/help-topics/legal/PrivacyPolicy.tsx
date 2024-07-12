import { CopyRight, H1, Paragraph } from '@cd/ui-lib';

function PrivacyPolicy() {
	return (
		<div className="md:m-auto px-2">
			<H1 className="text-3xl text-primary">Our Privacy Policy</H1>
			<Paragraph className="max-w-md text-justify">
				Gras respects and secures the private information of the businesses,
				people, entities, employees, and partners that do business with us. Gras
				will never share your information with other entities, or with any
				outside entities. We will never sell your information. We abide by all
				applicable privacy and information security laws.
			</Paragraph>
			<CopyRight />
		</div>
	);
}

export default PrivacyPolicy;
