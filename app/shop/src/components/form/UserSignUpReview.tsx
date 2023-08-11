import {
	getShopSite,
	renderNestedDataObject,
	selectUserState,
	TextContent,
	urlBuilder,
} from '@cd/core-lib';
import {
	Button,
	FlexBox,
	Grid,
	H2,
	H3,
	Paragraph,
	SignInButton,
	useFormContext,
} from '@cd/ui-lib';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function UserSignUpReview() {
	const { user, isSignedIn } = useSelector(selectUserState);

	const [account, setAccount] = useState(null);

	const { formValues, setFormValues, resetFormValues } = useFormContext();

	const loading = useRef(false);
	useEffect(() => {
		async function createNewUser() {
			try {
				setFormValues({
					newUser: {
						isSignUpComplete: true,
						emailVerified: true,
					},
				});
				console.info('form values: ', formValues);
				console.info('form values stringify: ', JSON.stringify(formValues));
				const response = await axios.post(
					urlBuilder.shop + '/api/user',
					formValues?.newUser,
					{
						validateStatus: (status) =>
							(status >= 200 && status < 300) || status == 404,
					},
				);
				console.info('response data: ', response.data);
				if (response.status !== 201) throw new Error(response.data);
				const createdAccount = response.data;
				setAccount(createdAccount);
				return createdAccount;
			} catch (error: any) {
				console.info('User Create Error: ', error);
				throw new Error(error.message);
				toast.error(error.message);
			}
		}

		async function createNewUserAndUpdateUserState() {
			try {
				loading.current = true;
				await createNewUser();

				resetFormValues();
				toast.success(TextContent.account.ACCOUNT_IS_CREATED);
			} catch (error: any) {
				console.info('User Create Error: ', error);
				toast.error(error.message);
			}
		}

		if (loading.current === false) createNewUserAndUpdateUserState();
	}, [resetFormValues, loading, setFormValues, formValues]);

	useEffect(() => {
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

	const imageSrc = formValues?.newUser?.profilePicture.location;

	return (
		<Grid className="mx-auto max-w-[525px] space-y-2">
			<H2 className="whitespace-normal">
				{(account && TextContent.account.ACCOUNT_IS_CREATED) ||
					'Creating your account...'}
			</H2>

			<Paragraph className="h-12">
				{(account &&
					`Welcome to Gras. ${TextContent.account.ENTER_OR_GO_TO_ACCOUNT}`) || (
					<></>
				)}
			</Paragraph>
			<div className={styles.renderList}>
				{account && (
					<>
						<FlexBox>
							<H3>{user.username}</H3>
							{imageSrc && <Image src={imageSrc} alt={user.username} />}
						</FlexBox>
						{renderNestedDataObject(account, Paragraph, {
							removeFields: [
								'coordinateId',
								'latitude',
								'longitude',
								'location',
								'userId',
								'scannedDOB',
								'createdAt',
								'id',
								'updatedAt',
								'emailVerified',
								'imageUser',
								'idFrontImage',
								'idBackImage',
							],
						})}
					</>
				)}
				{!account && (
					<Paragraph className="animate-bounce pt-1">
						Creating your account...
					</Paragraph>
				)}
			</div>

			<FlexBox className="m-auto flex-row space-x-4 pb-20">
				{isSignedIn ? (
					<>
						<Link href={getShopSite('/browse')}>
							<Button>Go to Gras</Button>
						</Link>
						<Link href={getShopSite('/account')}>
							<Button>Go to my account</Button>
						</Link>
					</>
				) : (
					<SignInButton bg="primary" />
				)}
			</FlexBox>
		</Grid>
	);
}

export default UserSignUpReview;

const styles = {
	renderList: 'border rounded p-4 w-full',
};
