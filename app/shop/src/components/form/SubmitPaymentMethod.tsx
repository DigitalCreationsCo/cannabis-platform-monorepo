/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	axios,
	type CustomerCreateStripeAccountResponse,
	type CustomerCreateStripeAccountPayload,
	urlBuilder,
	TextContent,
} from '@cd/core-lib';
import { Button, FlexBox, useFormContext } from '@cd/ui-lib';
import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { type AxiosResponse } from 'axios';
import { type FormEvent, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);

function SubmitCreditCard() {
	const { nextFormStep, prevFormStep, formValues } = useFormContext();

	function SubmitPaymentForm() {
		const stripe = useStripe();
		const elements = useElements();

		const [errorMessage, setErrorMessage] = useState();
		const [loading, setLoading] = useState(false);

		const handleError = (error: any) => {
			setLoading(false);
			setErrorMessage(error.message);
		};

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
				email: '',
				id: '',
				phone: '',
				firstName: '',
				lastName: '',
			});
			const { client_secret: clientSecret } = response.data.payload;

			// Confirm the SetupIntent using the details collected by the Payment Element
			const { error } = await stripe.confirmSetup({
				elements,
				clientSecret,
				confirmParams: {
					return_url: `${urlBuilder.shop}/#step=4`,
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
					<Button disabled={!stripe || loading}>
						{TextContent.ui.CONTINUE}
					</Button>
				</FlexBox>
				{errorMessage && <div>{errorMessage}</div>}
			</form>
		);
	}

	const options: StripeElementsOptions = {
		mode: 'setup',
		currency: 'usd',
		setup_future_usage: 'off_session',
	};

	return (
		<Elements stripe={stripePromise} options={options}>
			<SubmitPaymentForm />
		</Elements>
	);
}
export default SubmitCreditCard;
