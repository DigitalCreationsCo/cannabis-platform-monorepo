import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { submitAddressTour } from '../../tour/submitAddressTour';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function SubmitCreditCardForm() {
	function startTour() {
		if (!submitAddressTour.isActivated) submitAddressTour.start();
	}

	useEffect(() => {
		if (window.location.pathname != '/') startTour();
	}, []);

	const options: StripeElementsOptions = {
		mode: 'setup',
		currency: 'usd',
		setupFutureUsage: 'on_session',
		captureMethod: 'automatic',
		appearance: {},
	};

	return (
		<Elements stripe={stripePromise} options={options}>
			<form>
				<PaymentElement
					options={{
						layout: {
							type: 'tabs',
						},
					}}
				/>
				<button>Submit</button>
			</form>
		</Elements>
	);
}

export default SubmitCreditCardForm;
