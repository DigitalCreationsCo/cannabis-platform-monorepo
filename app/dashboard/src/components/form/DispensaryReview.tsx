import { renderNestedDataObject, TextContent } from '@cd/core-lib';
import {
	Button,
	FlexBox,
	Grid,
	H2,
	H3,
	Paragraph,
	useFormContext,
} from '@cd/ui-lib';

function DispensaryReview() {
	const { formValues, prevFormStep, nextFormStep } = useFormContext();
	return (
		<Grid className="mx-auto max-w-[525px] space-y-2">
			<FlexBox>
				<H2 className="whitespace-normal">
					{TextContent.account.ACCOUNT_IS_CREATED}
				</H2>
				<Paragraph>{TextContent.account.REVIEW_ACCOUNT}</Paragraph>
				<Paragraph>{TextContent.prompt.MAKE_CHANGES}</Paragraph>
			</FlexBox>
			<div className={styles.renderList}>
				<H3>Dispensary Account: {formValues?.organization?.name}</H3>
				{renderNestedDataObject(formValues?.organization, Paragraph, {
					removeFields: [
						'vendor',
						'id',
						'createdAt',
						'updatedAt',
						'coordinateId',
						'subdomainId',
						'addressId',
						'dialCode',
						'vendorId',
						'scheduleId',
						'location',
						'blurhash',
						'countryCode',
					],
				})}
			</div>

			<div className={styles.renderList}>
				<H3>My User Account</H3>
				{renderNestedDataObject(formValues?.newUser, Paragraph, {
					removeFields: [
						'emailVerified',
						'password',
						're_password',
						'dialCode',
						'countryCode',
					],
				})}
			</div>

			<FlexBox className="m-auto flex-row space-x-4 pb-20">
				<Button
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						prevFormStep();
					}}
				>
					back
				</Button>
				<Button
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						nextFormStep();
					}}
				>
					Next
				</Button>
			</FlexBox>
		</Grid>
	);
}

export default DispensaryReview;

const styles = {
	renderList: 'border border-2 border-primary shadow rounded p-4 w-full',
};
