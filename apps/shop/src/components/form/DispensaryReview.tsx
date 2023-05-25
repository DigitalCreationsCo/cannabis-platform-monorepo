import { renderNestedDataObject } from '@cd/core-lib';
import { Button, FlexBox, Grid, H2, H3, Paragraph } from '@cd/ui-lib';
import { useFormContext } from './FormStepProvider';

function DispensaryReview () {

    const { formData, prevFormStep, nextFormStep } = useFormContext();

    return (
        <Grid className="max-w-[525px] mx-auto space-y-2">
            <H2 className='whitespace-normal'>Please review your Dispensary, and account information</H2>

            <Paragraph>{`Review your account. If you want to make any changes, press back.`}</Paragraph>
            <div className={styles.renderList}>
                <H3>Dispensary Account: {formData?.organization?.name}</H3>
                {renderNestedDataObject(formData?.organization, Paragraph, ['vendor', 'id', 'createdAt', 'updatedAt', 'coordinateId', 'subdomainId'])}
            </div>

            <div className={styles.renderList}>
                <H3>My User Account</H3>
                {renderNestedDataObject(formData?.newUser, Paragraph, ['emailVerified', 'password', 're_password'])}
            </div>

            <FlexBox className='m-auto flex-row space-x-4 pb-20'>
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
    renderList: 'border rounded p-4 w-full'
}