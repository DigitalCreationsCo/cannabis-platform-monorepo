import TextContent from '@cd/core-lib/src/constants/text.constant';
import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import Button from '@cd/ui-lib/src/components/button/Button';
import CloseButton from '@cd/ui-lib/src/components/button/CloseButton';
import Price from '@cd/ui-lib/src/components/Price';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';
import { getBreakpointValue } from '@cd/ui-lib/src/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/img/logo120.png';
import { config as crawlerConfig, crawler } from '../crawler';
import styles from '../styles/theme';
import { type ViewProps } from '../types';
import CartList from './CartItemList';

function Checkout({ className, expanded, setExpand, dispensaryId }: ViewProps) {
	function runCrawler() {
		crawler(crawlerConfig)
			.then((result: any) => setCart({ ...cart, ...result }))
			.then(() => setExpand(true))
			.catch((error: any) => {
				console.error(error);
				setCartError(error);
			});
	}
	const getCartData = () => {
		runCrawler();
	};

	const handleCheckout = () => {
		setRedirecting(true);
		window.location.href = 'http://localhost:3000/quick-delivery';
	};

	const [cart, setCart] = useState<SimpleCart>({
		cartItems: [],
		total: 0,
		organizationId: dispensaryId,
	});
	const [cartError, setCartError] = useState('');
	const [redirecting, setRedirecting] = useState(false);

	const [screenwidth, setScreenwidth] = useState(window.innerWidth);
	const setWindowDimensions = () => {
		setScreenwidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener('resize', setWindowDimensions);
		return () => {
			window.removeEventListener('resize', setWindowDimensions);
		};
	}, []);
	const md = getBreakpointValue('md');

	if (redirecting)
		return (
			<div className={twMerge(styles.loading, className, 'overscroll-none')}>
				<Paragraph color="light" className="animate-bounce text-lg">
					Checking out...
				</Paragraph>

				<Small color="light">moving to Gras</Small>
			</div>
		);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			onClick={getCartData}
			className={twMerge(styles.checkout_f(expanded), className)}
		>
			{expanded ? (
				<>
					<div className="w-full">
						<CloseButton
							iconSize={32}
							theme={'light'}
							className="right-0 text-light"
							onClick={(e: any) => {
								e.stopPropagation();
								e.preventDefault();
								setExpand(false);
							}}
						/>
					</div>
					<img
						src={logo}
						alt="Delivery By Gras"
						height={40}
						width={40}
						className="object-contain"
					/>
					<Paragraph className="text-light m-auto">
						{TextContent.delivery.GRAS_WILL_DELIVER_STRAIGHT_TO_YOUR_DOOR}
						{'\n'}
						{TextContent.delivery.TIME_GUARANTEE}
					</Paragraph>
					<div className="w-2/3 my-4 overflow-y-auto">
						<CartList
							cart={cart}
							cartError={cartError}
							setExpandWidget={setExpand}
						/>
					</div>
					{cart && (
						<>
							<Paragraph className="w-2/3 flex justify-end text-light">
								Your total is
							</Paragraph>
							<Price
								color="light"
								className="pl-2 text-light"
								basePrice={cart.total}
							/>
						</>
					)}
					<Small className="text-light m-auto py-2">
						{TextContent.prompt.CHECKOUT_READY}
					</Small>
					<Button
						size="lg"
						className="text-dark font-bold hover:bg-accent-soft p-4 mb-10 mx-auto focus:bg-accent active:bg-accent bg-inverse"
						onClick={handleCheckout}
						disabled={cart.cartItems.length < 1 || redirecting}
					>
						Checkout
					</Button>
				</>
			) : (
				<>
					{screenwidth >= md && (
						<img
							src={logo}
							alt="Delivery By Gras"
							height={40}
							width={40}
							className="object-contain"
						/>
					)}
					<div className="flex flex-col">
						<Paragraph color="light" className="m-auto">
							Delivery by Gras to your door
						</Paragraph>

						<Small
							className="cursor-pointer m-auto w-fit border-b-2"
							color="light"
						>
							Click here to order
						</Small>
						{screenwidth >= md && <div className="w-[20px]"></div>}
					</div>
				</>
			)}
		</div>
	);
}

export default Checkout;
