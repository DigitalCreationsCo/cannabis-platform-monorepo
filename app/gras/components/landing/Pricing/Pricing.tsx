import { convertCentsToDollars } from '@cd/core-lib';
import { H2, H3, Paragraph, Price, styles } from '@cd/ui-lib';
import { HTMLAttributes } from 'react';
import { Card } from 'react-daisyui';
import { twMerge } from 'tailwind-merge';
import { CTA } from '..';

export interface PricingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  prices: {
    price: number;
    description: string;
    rate: 'per month' | 'per year' | 'pre unit';
    text?: string;
  }[];
  cta?: string;
}

const PricingCard = ({ title, prices, ...props }: PricingProps) => {
  return (
    <div
      id={props.id}
      className={twMerge(
        'relative bg-inverse',
        'md:py-28 md:pb-28',
        'gap-12',
        'flex flex-col items-center',
        props.className
      )}
    >
      <Card className="bg-light max-w-2xl mx-auto p-16 rounded shadow-md gap-y-12">
        <H2
          className={twMerge(
            styles.textShadow,
            'text-center text-5xl whitespace-pre-line font-bold leading-snug tracking-tight lg:text-6xl lg:leading-tight'
          )}
        >
          {title}
        </H2>
        <div className="mx-auto">
          {prices.map((price) => (
            <div
              key={`price-${price.description}`}
              className="mx-auto flex flex-col items-center"
            >
              <H3 className="items-center">{price.description}</H3>
              <H3 className="items-center">
                <span className="text-3xl font-bold text-primary">
                  {`$${convertCentsToDollars(price.price).split('.')[0]}`}
                </span>{' '}
                {`${price.rate}`}
              </H3>
              {price.text && (
                <Paragraph className="text-2xl">{price.text}</Paragraph>
              )}
            </div>
          ))}
        </div>
      </Card>
      {(props.cta && <CTA cta={props.cta} />) || <></>}
    </div>
  );
};

export default PricingCard;
