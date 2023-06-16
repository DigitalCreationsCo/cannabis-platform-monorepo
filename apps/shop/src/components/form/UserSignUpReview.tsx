import { getShopSite, renderNestedDataObject, selectUserState, TextContent } from '@cd/core-lib';
import { Button, FlexBox, Grid, H2, H3, Paragraph, SignInButton } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useFormContext } from './FormStepProvider';

function UserSignUpReview () {

    const { user, isSignedIn } = useSelector(selectUserState)
    
    const { formValues, resetFormValues } = useFormContext();

    async function createNewUser () {
        // send signupcomplete flag and other bool flags

        // send any required memberships
    }
    
    useEffect(() => {
        createNewUser()
        toast.success(TextContent.account.ACCOUNT_IS_CREATED);
    }, [])

    useEffect(() => {
        resetFormValues();
    }, [])

    useEffect(() => {
        // Disable going back to previous form/page
        // history.block((location, action) => {
        //   if (action === 'POP') {
        //     return false;
        //   }
        // });
        Router.beforePopState(() => false);
        // Test this
      }, []);

    console.log('formvalues', formValues);
    const 
    imageSrc = formValues?.newUser?.imageUser?.[0].location;

    return (
        <Grid className="max-w-[525px] mx-auto space-y-2">
            <H2 className='whitespace-normal'>{TextContent.account.ACCOUNT_IS_CREATED}</H2>

            <Paragraph>{`Welcome to Gras. ${TextContent.account.ENTER_OR_GO_TO_ACCOUNT}`}</Paragraph>
            <div className={styles.renderList}>
                <FlexBox>
                    <H3>{formValues?.newUser?.username}</H3>
                    {imageSrc && <Image src={imageSrc} alt={formValues.newUser?.username as string} />}
                </FlexBox>

                {renderNestedDataObject(formValues?.newUser, Paragraph, ['createdAt', 'updatedAt', 'emailVerified', 'imageUser', 'idFrontImage', 'idBackImage'])}
            </div>

            { isSignedIn ? <FlexBox className='m-auto flex-row space-x-4 pb-20'>
                <Link href={getShopSite("/browse")}>
                    <Button>
                        Go to Gras
                    </Button>
                </Link>
                <Link href={getShopSite("/account")}>
                    <Button>
                        Go to my account
                    </Button>
                </Link>
            </FlexBox> 
            : 
            <SignInButton />
            }

            
        </Grid>
    );
}

export default UserSignUpReview;

const styles = {
    renderList: 'border rounded p-4 w-full'
}