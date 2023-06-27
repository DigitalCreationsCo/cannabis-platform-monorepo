import { getShopSite, renderNestedDataObject, selectUserState, TextContent, urlBuilder } from '@cd/core-lib';
import { Button, FlexBox, Grid, H2, H3, Paragraph, SignInButton, useFormContext } from '@cd/ui-lib';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';

function UserSignUpReview () {

    const 
    dispatch = useAppDispatch(),
    { user, isSignedIn } = useSelector(selectUserState)

    const [account, setAccount] = useState(null);

    const { formValues, setFormValues, resetFormValues } = useFormContext();
    
    async function createNewUser () {
        try {
            setFormValues({ 
                newUser: { 
                    isSignUpComplete: true,
                    emailVerified: true,
                    
                }
            });

            console.log('form values: ', formValues)
            console.log('form values stringify: ', JSON.stringify(formValues));
            const response = await axios.post(
                urlBuilder.shop + '/api/user', 
                formValues?.newUser,
                { validateStatus: status => (status >= 200 && status < 300) || status == 404 }
                );

                console.log('response data: ', response.data)

                if (response.status !== 201)
                throw new Error(response.data);

                const
                createdAccount = response.data;

                setAccount(createdAccount);

                return createdAccount;

        }
        catch (error: any) {
            console.log('User Create Error: ', error);
            throw new Error(error.message);
            
            toast.error(error.message);
        }
    }
    
    let loading = false;
    useEffect(() => {
        async function createNewUserAndUpdateUserState () {
            try {
                loading = true;

                const 
                user = await createNewUser()
                resetFormValues();
                toast.success(TextContent.account.ACCOUNT_IS_CREATED);
            } 
            catch (error: any) {
                console.log('User Create Error: ', error);
                toast.error(error.message);
            }
        }

        if (loading === false)
        createNewUserAndUpdateUserState();
    }, [])

    useEffect(() => {
        // prevent user from going back to previous page ( build this into the formstepprovider )
        // const handleBeforeUnload = (event: any) => {
        //     event.preventDefault();
        //     event.returnValue = '';
        //   };
      
          const handlePopstate = () => {
            window.history.pushState(null, document.title, window.location.href);
          };
      
          // Disable going back to previous form/page
        //   window.addEventListener('beforeunload', handleBeforeUnload);
          window.addEventListener('popstate', handlePopstate);
      
          return () => {
            // window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopstate);
          };
    }, []);

    const 
    imageSrc = formValues?.newUser?.profilePicture.location;

    return (
    <Grid className="max-w-[525px] mx-auto space-y-2">
            <H2 className='whitespace-normal'>{ account && TextContent.account.ACCOUNT_IS_CREATED || 'Creating your account...'}</H2>

            <Paragraph className="h-12">{account && `Welcome to Gras. ${TextContent.account.ENTER_OR_GO_TO_ACCOUNT}` || <></>}</Paragraph>
            <div className={styles.renderList}>
                { account &&
                <>
                <FlexBox>
                    <H3>{user.username}</H3>
                    {imageSrc && <Image src={imageSrc} alt={user.username} />}
                    </FlexBox>
                { renderNestedDataObject(account, Paragraph, ['coordinateId', 'latitude', 'longitude', 'location', 'userId', 'scannedDOB', 'createdAt', 'id', 'updatedAt', 'emailVerified', 'imageUser', 'idFrontImage', 'idBackImage']) }
                </>
                }
                { !account && <Paragraph className='animate-bounce pt-1'>Creating your account...</Paragraph>}
            </div>

            <FlexBox className='m-auto flex-row space-x-4 pb-20'>
                { isSignedIn ? 
                (<><Link href={getShopSite("/browse")}>
                        <Button>
                            Go to Gras
                        </Button>
                    </Link>
                    <Link href={getShopSite("/account")}>
                        <Button>
                            Go to my account
                        </Button>
                    </Link>
                    </>) : 
                <SignInButton bg='primary' />
                }
            </FlexBox> 
            

            
        </Grid>
    );
}

export default UserSignUpReview;

const styles = {
    renderList: 'border rounded p-4 w-full'
}