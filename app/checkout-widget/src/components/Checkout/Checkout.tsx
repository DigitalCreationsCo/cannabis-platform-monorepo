import { axios } from '@cd/core-lib';
import TextContent from '@cd/core-lib/src/constants/text.constant';
import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import { crypto } from '@cd/core-lib/src/utils/crypto';
import { urlBuilder } from '@cd/core-lib/src/utils/urlBuilder';
import { type POS } from '@cd/data-access';
import Button from '@cd/ui-lib/src/components/button/Button';
import CloseButton from '@cd/ui-lib/src/components/button/CloseButton';
import CopyRight from '@cd/ui-lib/src/components/CopyRight';
import LoadingDots from '@cd/ui-lib/src/components/LoadingDots';
import Price from '@cd/ui-lib/src/components/Price';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';
import { getBreakpointValue } from '@cd/ui-lib/src/hooks/useBreakpoint';
import { Component } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../../public/img/logo120.png';
import { Config as CrawlerConfig } from '../../crawler';
import styles from '../../styles/theme';
import { type DOMKey, type ViewProps } from '../../widget.types';
import CartList from '../CartItemList';

export default class Checkout extends Component<
	ViewProps,
	{
		cart: SimpleCart;
		cartError: string;
		isLoading: boolean;
		isRedirecting: boolean;
		isScrolledToBottom: boolean;
		pos: POS;
	}
> {
	constructor(props: ViewProps) {
		super(props);
		this.state = {
			cart: {
				cartItems: [],
				tax: undefined,
				total: 0,
				organizationId: props.dispensaryId,
				organizationName: props.dispensaryName,
			},
			cartError: '',
			isLoading: false,
			isRedirecting: false,
			isScrolledToBottom: false,
			pos: props.pos,
		};
	}

	getCartData = async () => {
		let configKey: DOMKey = 'cart';
		switch (this.props.pos) {
			case 'dutchie':
				configKey = 'dutchie';
				break;
			case 'weedmaps':
				configKey = 'weedmaps';
				break;
			case 'blaze':
				configKey = 'blaze';
				break;
			case 'none':
				configKey = 'cart';
				break;
			default:
				configKey = 'cart';
		}
		if (document.querySelector('[aria-label="dutchiePay"]')) {
			this.setState({ pos: 'dutchie' });
			configKey = 'dutchie';
		}

		const config = new CrawlerConfig(configKey).config;

		let crawler;
		// eslint-disable-next-line sonarjs/no-small-switch
		switch (configKey) {
			case 'dutchie':
				crawler = await import('../../crawler/dutchie-crawler').then(
					(c) => c.default,
				);
				break;
			case 'cart':
				crawler = await import('../../crawler/checkout-crawler').then(
					(c) => c.default,
				);
				break;
			// eslint-disable-next-line sonarjs/no-duplicated-branches
			default:
				crawler = await import('../../crawler/checkout-crawler').then(
					(c) => c.default,
				);
		}
		if (!crawler) throw new Error('crawler not found');
		crawler(config, configKey)
			.then((cart: SimpleCart) =>
				this.setState({ cart: { ...this.state.cart, ...cart } }),
			)
			.catch((error: any) => {
				console.error('getCartData error, ', error);
				this.setState({ cartError: error.message });
			});
	};

	handleCheckout = async () => {
		try {
			if (this.state.cart.cartItems.length > 0) {
				this.setState({ isLoading: true });
				const token = crypto.encrypt(this.state.cart);
				const expires = new Date();
				expires.setDate(expires.getDate() + 1);
				const response = await axios.post(
					urlBuilder.shop + '/api/delivery/token',
					{ token },
					{
						headers: {
							'content-type': 'application/json',
						},
						withCredentials: true,
						timeout: 4000,
					},
				);
				console.info('response ', response);
				if (response.data.success === 'false')
					throw new Error(response.data.error);
				if (response.status === 302) {
					this.setState({ isRedirecting: true, isLoading: false });
					window.location.href = response.data.redirect;
				}
			}
		} catch (error) {
			console.error('handleCheckout error, ', error);
			this.setState({
				isRedirecting: false,
				isLoading: false,
				cartError: error.message,
			});
			console.info('this.state', this.state);
		}
	};

	componentDidMount() {
		this.getCartData();
	}

	useStaticQuantity() {
		// handle item quantities from dutchie checkout
		return this.state.pos === 'dutchie';
	}

	render() {
		const md = getBreakpointValue('md');
		const { expanded, setExpand, screenwidth } = this.props;

		const listScroll = (e: Event) => {
			if (this.state.cart.cartItems.length > 2) {
				e.stopPropagation();
				e.stopImmediatePropagation();
				return false;
			}
		};
		const lockWidgetScroll = (e: Event) => {
			if (this.props.expanded) {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				return false;
			}
		};
		function enableScroll() {
			document
				.querySelector('#Cart-Item-List')
				?.removeEventListener('wheel', listScroll, false);
			document
				.querySelector('#Checkout')
				?.removeEventListener('wheel', lockWidgetScroll, false);
		}
		function disableScroll() {
			document
				.querySelector('#Cart-Item-List')
				?.addEventListener('wheel', listScroll, { passive: false });
			document
				.querySelector('#Checkout')
				?.addEventListener('wheel', lockWidgetScroll, { passive: false });
		}

		if (this.state.isRedirecting)
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
				id="Checkout"
				onMouseEnter={disableScroll}
				onMouseLeave={enableScroll}
				className={twMerge(styles.checkout_f(this.props.expanded))}
			>
				{expanded ? (
					<>
						<div className="w-full">
							<CloseButton
								iconSize={32}
								theme={'light'}
								className="right-0 pr-4"
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
							{TextContent.info.PARTNER_FOR_DELIVERY_f(
								this.props.dispensaryName,
							)}
						</Paragraph>
						<Paragraph className="text-light m-auto">
							{TextContent.info.TIME_GUARANTEE}
						</Paragraph>
						<Paragraph className="text-light m-auto">
							<b>{TextContent.shop.ORDER_INFO_HEADER}</b> 🔽
						</Paragraph>
						<div
							id="Cart-Item-List"
							className={twMerge([styles.cart_list, 'w-3/4 md:w-2/3 my-2'])}
						>
							<CartList
								cart={this.state.cart}
								cartError={this.state.cartError}
								setExpandWidget={setExpand}
								setIsScrolledToBottom={(isScrolledToBottom: boolean) =>
									this.setState({ isScrolledToBottom })
								}
								// staticQuantity={this.useStaticQuantity()}
							/>
						</div>

						{this.state.cart.cartItems.length > 0 &&
							this.state.cart.subtotal && (
								<div className="w-2/3 flex flex-row justify-end">
									<Paragraph className="text-light">subtotal</Paragraph>
									<Price
										color="light"
										className="pl-2 text-light"
										basePrice={this.state.cart.subtotal}
									/>
								</div>
							)}
						{this.state.cart.cartItems.length > 0 &&
							this.state.cart.discount !== undefined && (
								<div className="w-2/3 flex flex-row justify-end">
									<Paragraph className="text-light">discount</Paragraph>
									<Price
										color="light"
										className="pl-2 text-light"
										basePrice={this.state.cart.discount}
									/>
								</div>
							)}
						{/* {this.state.cart.cartItems.length > 0 &&
							this.state.cart.tax !== undefined && (
								<div className="w-2/3 flex flex-row justify-end">
									<Paragraph className="text-light">taxes</Paragraph>
									<Price
										color="light"
										className="pl-2 text-light"
										basePrice={this.state.cart.tax}
									/>
								</div>
							)} */}
						{this.state.cart.cartItems.length > 0 && (
							<div className="w-3/4 md:w-2/3 flex flex-row justify-end">
								<Paragraph className="text-light">Your total is</Paragraph>
								<Price
									color="light"
									className="pl-2 text-light"
									basePrice={this.state.cart.total}
								/>
							</div>
						)}
						<Button
							id="Checkout-Button"
							size="lg"
							bg={(this.state.cartError && 'accent-soft') || 'inverse'}
							hover="accent-soft"
							className="text-dark font-bold p-4 my-4 mx-auto focus:bg-accent active:bg-accent"
							onClick={this.handleCheckout}
							disabled={
								this.state.cart.cartItems.length < 1 || this.state.isRedirecting
							}
						>
							{this.state.isLoading === true ? (
								<LoadingDots />
							) : (
								(this.state.cartError && (
									<Paragraph color="light" className="mx-auto w-2/3">
										{this.state.cartError}
									</Paragraph>
								)) ||
								'Checkout'
							)}
						</Button>
						<Small className="text-light m-auto">
							{TextContent.prompt.REVIEW_CHECKOUT}
						</Small>
						<div className="m-auto">
							<CopyRight prepend={TextContent.info.DELIVERY_BY_GRAS} />
						</div>
					</>
				) : (
					<div data-tip={'Tooltip'} className={twMerge('flex flex-row')}>
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
								<b>Delivery by Gras</b> to your door
							</Paragraph>
							<Small
								className="cursor-pointer m-auto w-fit border-b-2"
								color="light"
							>
								Click here for delivery
							</Small>
						</div>
						{screenwidth >= md && <div className="w-[20px]"></div>}
					</div>
				)}
			</div>
		);
	}
}
