/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	axios,
	type CustomerCreateStripeAccountResponse,
	type CustomerCreateStripeAccountPayload,
	urlBuilder,
	TextContent,
} from '@gras/core';
import { Button, FlexBox, useFormContext } from '@gras/ui';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { type AxiosResponse } from 'axios';
import { type FormEvent, useState, useEffect } from 'react';

function SubmitPaymentForm() {
	const { prevFormStep, setCanProceed, formValues } = useFormContext();

	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState();
	const [loading, setLoading] = useState(false);

	const handleError = (error: any) => {
		setLoading(false);
		setErrorMessage(error.message);
	};

	useEffect(() => {
		setCanProceed(true);
	}, [setCanProceed]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();

		if (!stripe) return;
		if (!elements) return;

		setLoading(true);

		// Trigger form validation and wallet collection
		const { error: submitError } = await elements.submit();
		if (submitError) {
			handleError(submitError);
			return;
		}

		const response = await axios.post<
			CustomerCreateStripeAccountResponse,
			AxiosResponse<CustomerCreateStripeAccountResponse>,
			CustomerCreateStripeAccountPayload
		>(urlBuilder.shop + '/api/stripe/create-customer', {
			email: formValues.newUser!.email!,
			id: formValues.newUser!.id!,
			phone: formValues.newUser!.phone!,
			firstName: formValues.newUser!.firstName!,
			lastName: formValues.newUser!.lastName!,
		});

		if (!response.data.success || response.data.success === 'false')
			handleError(
				(response.data as any).error || (response.data as any).message,
			);

		setCanProceed(true);

		const { client_secret: clientSecret } = response.data.payload;
		// Confirm the SetupIntent using the details collected by the Payment Element
		const { error } = await stripe.confirmSetup({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${urlBuilder.shop}/signup/thank-you`,
			},
		});

		if (error) {
			// This point is only reached if there's an immediate error when
			// confirming the setup. Show the error to your customer (for example, payment details incomplete)
			handleError(error);
		} else {
			// Your customer is redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer is redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
			// nextFormStep();
		}
	};
	return (
		<form className="mx-auto items-center" onSubmit={handleSubmit}>
			<PaymentElement
				options={{
					layout: {
						type: 'tabs',
					},
				}}
			/>
			<FlexBox className="flex-row justify-evenly space-x-8 mt-4">
				<Button
					disabled={loading}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						prevFormStep();
					}}
				>
					{TextContent.ui.BACK}
				</Button>
				<Button disabled={!stripe || loading} loading={loading}>
					{TextContent.ui.CONTINUE}
				</Button>
			</FlexBox>
			{errorMessage && <div>{errorMessage}</div>}
		</form>
	);
}
export default SubmitPaymentForm;
