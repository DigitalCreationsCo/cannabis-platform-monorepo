import { Card, H1, Page, Paragraph, type LayoutContextProps } from '@gras/ui';
import Head from 'next/head';
import Confetti from 'react-confetti';
import { twMerge } from 'tailwind-merge';

function ThankYouForSigningUp() {
	return (
		<Page className={twMerge(styles.gradient, 'pb-0 md:pb-24')}>
			<Head>
				<title>Thank you for signing up for delivery from Gras</title>
			</Head>
			<Confetti
				className="h-full w-full"
				numberOfPieces={540}
				recycle={false}
			/>
			<Card className="max-w-5xl bg-inverse-soft m-auto space-y-2 p-4 text-center h-[440px] align-middle justify-center">
				<H1 className="text-primary">Welcome to Gras</H1>
				{/* <H4>Thank you for Signing up for Delivery from Gras</H4> */}
				{/* ** Is this same-day delivery or next day delivery?? **  */}
				<Paragraph className="p-8 rounded text-lg bg-inverse border-2 border-primary">
					{`You just gained exclusive access to the best deals in the city, delivered to your doorstep.
					Our deals are sent by text message around 10:00am ET daily. If you want to order, reply with the number of packs you want to buy. You'll receive a confirmation text, and your order will be delivered within the same day.`}
				</Paragraph>
			</Card>
		</Page>
	);
}

ThankYouForSigningUp.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default ThankYouForSigningUp;

const styles = {
	gradient: [
		'bg-gradient-to-b',
		'from-primary',
		'to-secondary',
		'p-0 lg:p-16 h-max',
	],
};
