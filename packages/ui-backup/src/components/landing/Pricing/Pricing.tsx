import { type HTMLAttributes } from 'react';
import { Card } from 'react-daisyui';
import { twMerge } from 'tailwind-merge';
import { styles } from '../../../styleClassNames';
import { CTA } from '../../button';
import { H2, H3 } from '../../Typography';

export interface PricingProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	dealValues?: number[];
	prices: {
		price: number | string;
		description: string;
		rate: 'monthly' | 'per year' | 'pre unit';
		text?: string;
	}[];
	href?: string;
	cta?: string;
}

const PricingCard = ({
	title,
	prices,
	href = '#get-started',
	...props
}: PricingProps) => {
	return (
		<div
			id={props.id}
			className={twMerge(
				'relative bg-inverse',
				'md:!py-28 md:pb-28',
				'gap-12',
				'flex flex-col items-center',
				props.className
			)}
		>
			<Card className="bg-light border border-gray-300 max-w-2xl p-4 md:p-16 mx-auto rounded shadow-md gap-y-12">
				<H2
					className={twMerge(
						styles.HERO.heading,
						'text-dark',
						'text-5xl lg:text-6xl'
					)}
				>
					{title}
				</H2>
				<div className="mx-auto">
					{prices.map((price) => (
						<div
							key={`price-${price.description}`}
							className="mx-auto flex flex-col items-center gap-y-2"
						>
							<H3 className="items-center">{price.description}</H3>
							<H3 className="items-center">
								<span className="text-5xl font-bold text-primary">
									{price.price}
								</span>{' '}
								{`${price.rate}`}
							</H3>
							{/* {price.text && (
								<Paragraph className="text-2xl">{price.text}</Paragraph>
							)} */}
						</div>
					))}
				</div>
				{(props.cta && <CTA cta={props.cta} href={href} />) || <></>}
			</Card>
		</div>
	);
};

export default PricingCard;
