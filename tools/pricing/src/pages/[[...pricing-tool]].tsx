import {
	Card,
	Center,
	H2,
	Page,
	Small,
	Grid,
	Select,
	FlexBox,
	TextField,
	Price,
	Paragraph,
	type LayoutContextProps,
} from '@gras/ui';
import { useState } from 'react';

function PricingTool() {
	const timeScaleMap = {
		daily: 1,
		monthly: 30,
	};
	const [timeScale, setTimeScale] = useState<'daily' | 'monthly'>('daily');
	const [numOrders, setNumOrders] = useState<number>(0);
	const [numOrdersIncrease, setNumOrdersIncrease] = useState<number>(0);
	const [numOrdersIncreaseType, setNumOrdersIncreaseType] = useState<
		'sum' | 'percent'
	>('sum');
	const [avgSaleTotal, setAvgSaleTotal] = useState<number>(0);
	const [margin, setMargin] = useState<number>(0);

	const increaseOrders = () => {
		if (numOrdersIncreaseType === 'sum') {
			return Number(numOrders) + Number(numOrdersIncrease);
		} else {
			return (
				Number(numOrders) +
				Math.floor(Number(numOrders) * (Number(numOrdersIncrease) / 100))
			);
		}
	};
	const totalOrders = () => increaseOrders() * timeScaleMap[timeScale];

	const ClientRevenue = () => {
		const revenue = increaseOrders() * avgSaleTotal;
		return (
			<div className="flex flex-row justify-between">
				client daily revenue <Price basePrice={revenue * 100} />
			</div>
		);
	};

	const ClientMonthlyRevenue = () => {
		const revenue = increaseOrders() * avgSaleTotal;
		return (
			<div className="flex flex-row justify-between">
				client monthly revenue <Price basePrice={revenue * 100 * 30} />
			</div>
		);
	};

	const Margin = () => {
		return (
			<div className="flex flex-row justify-between">
				product margins <Paragraph>{margin}%</Paragraph>
			</div>
		);
	};

	const ClientProfitBeforeSalesIncrease = () => {
		const clientProfit =
			numOrders * avgSaleTotal * timeScaleMap[timeScale] -
			numOrders * avgSaleTotal * (margin / 100) * timeScaleMap[timeScale];
		return (
			<div className="flex flex-row justify-between">
				client profit <Price basePrice={clientProfit * 100} />
			</div>
		);
	};

	const ClientProfitAfterSalesIncrease = () => {
		const clientProfit =
			increaseOrders() * avgSaleTotal * timeScaleMap[timeScale] -
			increaseOrders() *
				avgSaleTotal *
				(margin / 100) *
				timeScaleMap[timeScale];
		return (
			<div className="flex flex-row justify-between">
				client profit after increase
				<Price basePrice={clientProfit * 100} />
			</div>
		);
	};

	const ProductRevenue = () => {
		const profit =
			increaseOrders() *
			avgSaleTotal *
			(margin / 100) *
			timeScaleMap[timeScale];
		return (
			<div className="flex flex-row justify-between">
				product revenue <Price basePrice={profit * 100} />
			</div>
		);
	};
	return (
		<Page>
			<Center className="justify-start">
				<Card>
					<H2 className="text-secondary">Gras Product Pricing</H2>
					<Small>
						Gras Product Pricing is a tool for modeling prices for Gras products
						for clients and customers. For internal use only.
					</Small>
					<Grid className="grid-cols-6 gap-2 py-4">
						<FlexBox className="col-span-2 flex-row items-center">
							<Small>timeframe</Small>
							<Select
								setOption={setTimeScale}
								values={['daily', 'monthly']}
							></Select>
						</FlexBox>

						<FlexBox className="col-span-4 flex-row items-center sm:col-span-3">
							<Small>how many sales do you want to model?</Small>
							<TextField
								min={0}
								onChange={(e: any) => setNumOrders(e.target?.value)}
								type={'number'}
							/>
						</FlexBox>

						<FlexBox className="col-span-2 flex-row items-center">
							<Small>average order price</Small>
							$
							<TextField
								min={0}
								onChange={(e: any) => setAvgSaleTotal(e.target?.value)}
								type={'number'}
							/>
						</FlexBox>

						<FlexBox className="col-span-2 flex-row items-center">
							<Small>product profit margin</Small>
							<TextField
								min={0}
								onChange={(e: any) => setMargin(e.target?.value)}
								type={'number'}
							/>
							%
						</FlexBox>

						<FlexBox className="col-span-2 row-start-3 flex-row items-center sm:col-span-2">
							<Small>sales increase?</Small>
							<TextField
								min={0}
								onChange={(e: any) => setNumOrdersIncrease(e.target?.value)}
								type={'number'}
							/>
						</FlexBox>

						<FlexBox className="col-span-2 row-start-3 flex-row items-center sm:col-span-3">
							<Small>delta</Small>
							<Select
								setOption={setNumOrdersIncreaseType}
								values={['sum', 'percent']}
							></Select>
						</FlexBox>

						<div className="col-span-6 row-start-4 m-auto w-[330px] rounded border p-2">
							{`${totalOrders()} ${timeScale} order${
								(totalOrders() > 1 && 's') || ''
							} of $${avgSaleTotal}`}
							<ClientRevenue />
							<ClientMonthlyRevenue />
							<Margin />
							<ClientProfitBeforeSalesIncrease />
							<ClientProfitAfterSalesIncrease />
							<ProductRevenue />
						</div>
					</Grid>
				</Card>
			</Center>
		</Page>
	);
}

PricingTool.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default PricingTool;
