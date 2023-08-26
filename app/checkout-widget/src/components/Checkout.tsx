import TextContent from '@cd/core-lib/src/constants/text.constant';
import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import Button from '@cd/ui-lib/src/components/button/Button';
import CloseButton from '@cd/ui-lib/src/components/button/CloseButton';
import Price from '@cd/ui-lib/src/components/Price';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';
import { getBreakpointValue } from '@cd/ui-lib/src/hooks/useBreakpoint';
import { Component } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/img/logo120.png';
import { Config as CrawlerConfig } from '../crawler';
import styles from '../styles/theme';
import { type ViewProps } from '../types';
import CartList from './CartItemList';

export default class Checkout extends Component<
	ViewProps,
	{
		cart: SimpleCart;
		cartError: string;
		redirecting: boolean;
		isScrolledToBottom: boolean;
	}
> {
	constructor(props: ViewProps) {
		super(props);
		this.state = {
			cart: {
				cartItems: [],
				total: 0,
				organizationId: props.dispensaryId,
				organizationName: props.dispensaryName,
			},
			cartError: '',
			redirecting: false,
			isScrolledToBottom: false,
		};
	}

	getCartData = () => {
		const config = new CrawlerConfig('cart').config;
		console.info('fetch cart');
		let crawler;

		// eslint-disable-next-line sonarjs/no-small-switch
		switch (this.props.useDutchie) {
			case true:
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				crawler = require('../crawler/dutchie').crawler;
				break;
			default:
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				crawler = require('../crawler/leafly').crawler;
		}
		crawler(config, 'cart')
			.then((cart: SimpleCart) =>
				this.setState({ cart: { ...this.state.cart, ...cart } }),
			)
			.catch((error: any) => {
				console.error('getCartData error, ', error);
				this.setState({ cartError: error.message });
			});
	};

	handleCheckout = () => {
		this.setState({ redirecting: true });
		window.location.href = 'http://localhost:3000/quick-delivery';
	};

	componentDidMount() {
		this.getCartData();
	}

	render() {
		const md = getBreakpointValue('md');
		const { expanded, setExpand, screenwidth } = this.props;

		if (this.state.redirecting)
			return (
				<div className={twMerge(styles.loading)}>
					<Paragraph color="light" className="animate-bounce text-lg">
						Checking out...
					</Paragraph>
					<Small color="light">moving to Gras</Small>
				</div>
			);
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<div
				onClick={() => this.props.setExpand(true)}
				id="View-Checkout"
				className={twMerge(styles.checkout_f(this.props.expanded))}
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
							className="object-contain animate-[shake_4s_ease-in-out_infinite]"
						/>
						<Paragraph className="text-light m-auto">
							{TextContent.delivery.GRAS_WILL_DELIVER_STRAIGHT_TO_YOUR_DOOR}
							{'\n'}
							{TextContent.delivery.TIME_GUARANTEE}
						</Paragraph>
						<div className={twMerge('w-2/3 my-4', 'overflow-y-auto')}>
							<CartList
								cart={this.state.cart}
								cartError={this.state.cartError}
								setExpandWidget={setExpand}
								setIsScrolledToBottom={(isScrolledToBottom: boolean) =>
									this.setState({ isScrolledToBottom })
								}
							/>
						</div>
						{this.state.cart.cartItems.length > 0 && (
							<div className="w-2/3 flex flex-row justify-end">
								<Paragraph className="text-light">Your total is</Paragraph>
								<Price
									color="light"
									className="pl-2 text-light"
									basePrice={this.state.cart.total}
								/>
							</div>
						)}
						<Small className="text-light m-auto py-2">
							{TextContent.prompt.CHECKOUT_READY}
						</Small>
						<Button
							size="lg"
							bg="inverse"
							hover="accent-soft"
							className="text-dark font-bold p-4 mb-10 mx-auto focus:bg-accent active:bg-accent"
							onClick={this.handleCheckout}
							disabled={
								this.state.cart.cartItems.length < 1 || this.state.redirecting
							}
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
								className="object-contain animate-[shake_4s_ease-in-out_infinite]"
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
						</div>
						{screenwidth >= md && <div className="w-[20px]"></div>}
					</>
				)}
			</div>
		);
	}
}
