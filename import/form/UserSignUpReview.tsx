import {
	axios,
	renderNestedDataObject,
	selectIsCartEmpty,
	TextContent,
	urlBuilder,
	userActions,
	useAppDispatch,
} from '@cd/core-lib';
import { type UserWithDetails } from '@cd/data-access';
import {
	Button,
	FlexBox,
	Grid,
	H2,
	H3,
	Paragraph,
	useFormContext,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function UserSignUpReview() {
	const isCartEmpty = useSelector(selectIsCartEmpty);
	const { href } = TextContent;
	const dispatch = useAppDispatch();

	const [account, setAccount] = useState<UserWithDetails | null>(null);
	const [, setCookie] = useCookies(['yesOver21']);

	const { formValues, isComplete, resetFormValues } = useFormContext();

	const loading = useRef(false);

	async function createUser() {
		try {
			const response = await axios.put(urlBuilder.shop + '/api/user', {
				...formValues.newUser,
				isSignUpComplete: true,
				emailVerified: true,
			});
			if (response.data.success === 'false')
				throw new Error(response.data.error);
			console.info('createdAccount: ', response.data.payload);
			// get token here, and pass it to signin action
			const createdAccount: UserWithDetails = response.data.payload;
			setAccount(createdAccount);
			return createdAccount;
		} catch (error: any) {
			throw new Error(error.message);
			toast.error(error.message);
		}
	}

	useEffect(() => {
		async function createNewUserAndUpdateUserState() {
			try {
				loading.current = true;
				await createUser();
				setCookie('yesOver21', 'true');
				console.debug('set yesOver21 cookie to true');
				isComplete && isComplete();
				resetFormValues();
				toast.success(TextContent.account.ACCOUNT_IS_CREATED);
			} catch (error: any) {
				toast.error(error.message);
			}
		}

		if (loading.current === false) createNewUserAndUpdateUserState();
	}, [account]);

	useEffect(() => {
		return () => {
			if (account) dispatch(userActions.signinUserSync(account as any));
		};
	}, [account]);

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
							<H3>{account.username}</H3>
							{account.profilePicture?.location && (
								<Image
									src={account.profilePicture?.location as string}
									alt={account.username}
									width={100}
									height={100}
									loader={({ src }) => src}
								/>
							)}
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
								'blurhash',
								'countryCode',
								'country',
								'orders',
							],
						})}
						<FlexBox className="m-auto flex-row space-x-4 pb-20">
							<>
								{isCartEmpty ? (
									<Link href={href.browse}>
										<Button bg="primary" hover="primary-light" size="lg">
											Go to Gras
										</Button>
									</Link>
								) : (
									<Link href={href.checkout}>
										<Button bg="primary" hover="primary-light" size="lg">
											Checkout
										</Button>
									</Link>
								)}
							</>
						</FlexBox>
					</>
				)}
				{!account && (
					<Paragraph className="animate-bounce pt-1">
						Creating your account...
					</Paragraph>
				)}
			</div>
		</Grid>
	);
}

export default UserSignUpReview;

const styles = {
	renderList: 'border rounded p-4 w-full',
};
