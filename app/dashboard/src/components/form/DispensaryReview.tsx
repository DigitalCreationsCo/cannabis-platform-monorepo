import { renderNestedDataObject } from '@cd/core-lib';
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
			<H2 className="whitespace-normal">
				Please review your Dispensary, and account information
			</H2>

			<Paragraph>{`Review your account. If you want to make any changes, press back.`}</Paragraph>
			<div className={styles.renderList}>
				<H3>Dispensary Account: {formValues?.organization?.name}</H3>
				{renderNestedDataObject(formValues?.organization, Paragraph, [
					'vendor',
					'id',
					'createdAt',
					'updatedAt',
					'coordinateId',
					'subdomainId',
				])}
			</div>

			<div className={styles.renderList}>
				<H3>My User Account</H3>
				{renderNestedDataObject(formValues?.newUser, Paragraph, [
					'emailVerified',
					'password',
					're_password',
				])}
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
	renderList: 'border rounded p-4 w-full',
};
