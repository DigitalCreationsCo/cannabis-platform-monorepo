import { Icons } from '@cd/ui-lib';
import benefitOneImg from '../../public/get-order.png';
import benefitTwoImg from '../../public/pair-of-buds.png';

export const benefitOne = {
	title: 'Delivering Medical and Recreational Cannabis',
	// desc: `We help you process delivery orders.
	// A Gras DeliveryPerson delivers quickly and safely to your customers. `,
	image: benefitOneImg,
	bullets: [
		{
			title: 'Secure Delivery',
			desc: 'Our Delivery team is trained in industry compliance and safety.',
			icon: Icons.UserAdmin,
		},
		{
			title: `So Easy You'll Giggle`,
			desc: `Sign up and receive deliveries the same day.`,
			icon: Icons.CheckmarkOutline,
		},
		{
			title: 'Same-Day Delivery',
			desc: 'We guarantee delivery within 2 hours in Baltimore, Maryland.',
			icon: Icons.ShoppingBag,
		},
	],
};

export const benefitTwo = {
	title: 'Compliant Delivery That Grows With You',
	// desc: `Gras is investing in the growth of your dispensary. Our goal is for you to have your best years in business yet. `,
	image: benefitTwoImg,
	bullets: [
		{
			title: 'Industry Compliant',
			desc: 'We follow all state compliance guidelines for delivery and sale of cannabis.',
			// and we are fully insured.',
			icon: Icons.TaskComplete,
		},
		{
			title: 'Support When You Need It',
			desc: (
				<>
					Gras support is available by phone, email and chat. We're only a phone
					call or a click away.
					{/* <br />
					<Link
						href={TextContent.href.support}
						className="hover:text-primary inline-block mx-auto text-2xl text-inverse font-semibold underline"
					>
						<H3>Get Support</H3>
					</Link> */}
				</>
			),
			icon: Icons.ServiceDesk,
		},
		{
			title: 'Your Growth Is Our Goal',
			desc: `Gras is committed to long term growth. 
			We believe in building a sustainable cannabis industry.`,
			icon: Icons.IncreaseLevel,
		},
	],
};
