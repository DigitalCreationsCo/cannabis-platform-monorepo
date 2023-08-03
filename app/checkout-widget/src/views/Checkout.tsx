import TextContent from '@cd/core-lib/src/constants/textContent';
import { SimpleCart } from '@cd/core-lib/src/reduxDir/features/cart.reducer';
import Button from '@cd/ui-lib/src/components/button/Button';
import CloseButton from '@cd/ui-lib/src/components/button/CloseButton';
import FlexBox from '@cd/ui-lib/src/components/FlexBox';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';
import { getBreakpointValue } from '@cd/ui-lib/src/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { CheckoutWidgetConfigOptions } from '..';
import logo from '../assets/logo120.png';
import CartList from '../components/CartItemList';
import { cheerioCrawler as crawler } from '../crawler';
import WidgetView, { WidgetViewProps } from './WidgetView';

function Checkout({
	className,
	expandWidget,
	setExpandWidget,
	dispensaryKey,
	dispensaryName,
}: WidgetViewProps & CheckoutWidgetConfigOptions) {
	const [cart, setCart] = useState<SimpleCart>({
		cartItems: [],
		total: 0,
		organizationId: dispensaryKey,
	});
	const [cartError, setCartError] = useState('');

	const [loadingCheckout, setLoadingCheckout] = useState(false);

	const handleCheckout = () => {
		setLoadingCheckout(true);
		window.location.href = 'http://localhost:3000/quick-delivery';
	};

	const runCrawler = () => {
		crawler()
			.then((result) => setCart({ ...cart, ...result }))
			.then(() => setExpandWidget(true))
			.catch((error) => {
				console.error(error);
				setCartError(error);
			});
	};

	const getCartData = () => {
		runCrawler();
	};

	const [screenwidth, setScreenwidth] = useState(window.innerWidth);

	const setWindowDimensions = () => {
		setScreenwidth(window.innerWidth);
	};

	const md = getBreakpointValue('md');

	useEffect(() => {
		window.addEventListener('resize', setWindowDimensions);
		return () => {
			window.removeEventListener('resize', setWindowDimensions);
		};
	}, []);

	const styles = {
		loading: [
			'md:!rounded',
			'flex flex-col items-center justify-center',
			'md:w-[440px] h-[440px]',
			'cursor-default',
			className,
		],
		showCart: [
			'md:!rounded',
			'flex flex-col justify-between m-auto',
			'md:w-[440px] h-[440px] space-y-2',
			'cursor-default',
			className,
		],
		capsule: [
			'justify-center',
			'flex flex-row',
			'md:rounded-full',
			'cursor-pointer',
			'min-h-[44px]',
			className,
		],
	};
	return (
		<>
			{expandWidget ? (
				(loadingCheckout && (
					<div className={twMerge(styles.loading)}>
						<Paragraph color="light" className="animate-bounce text-lg">
							Checking out...
						</Paragraph>

						<Small color="light">moving to Gras</Small>
					</div>
				)) || (
					<div className={twMerge(styles.showCart)}>
						<CloseButton
							iconSize={32}
							className="pr-4 text-light"
							theme={'light'}
							onClick={() => setExpandWidget(false)}
						/>

						<Paragraph className="text-light m-auto">
							{TextContent.delivery.GRAS_WILL_DELIVER}
						</Paragraph>

						<CartList
							cart={cart}
							cartError={cartError}
							setExpandWidget={setExpandWidget}
						/>

						<FlexBox className="mx-auto pb-2">
							<Small className="text-light m-auto pb-2">
								{TextContent.prompt.CHECKOUT_READY}
							</Small>

							<Button
								className="p-4 mx-auto bg-inverse"
								hover="accent"
								onClick={handleCheckout}
								disabled={cart.cartItems.length === 0 || loadingCheckout}
							>
								Checkout
							</Button>
						</FlexBox>
					</div>
				)
			) : (
				<button className={twMerge(styles.capsule)} onClick={getCartData}>
					{screenwidth >= md && (
						<img
							src={logo}
							alt="Delivery By Gras"
							height={40}
							width={40}
							className="object-contain"
						/>
					)}

					<FlexBox className="flex-col mx-auto">
						<Paragraph color="light" className="m-auto">
							Delivery by Gras to your door
						</Paragraph>

						<Small
							className="cursor-pointer m-auto w-fit border-b-2"
							color="light"
						>
							Click here to order
						</Small>
					</FlexBox>

					{screenwidth >= md && <div className="w-[20px]"></div>}
				</button>
			)}
		</>
	);
}

export default WidgetView(Checkout);
