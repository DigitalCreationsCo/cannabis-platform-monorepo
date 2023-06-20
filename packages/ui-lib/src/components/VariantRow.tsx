import { ProductVariantWithDetails } from '@cd/data-access';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/assets/images/logo.png';
import Icons from '../icons';
import FlexBox from './FlexBox';
import IconWrapper from './IconWrapper';
import Price from './Price';
import Row from './Row';
import { Small, Span } from './Typography';

type ProductVariantRowProps = {
    variant: ProductVariantWithDetails;
};
export default function ProductVariantRow({ variant }: ProductVariantRowProps) {

    const 
    imageSrc = variant.images?.[0]?.location || logo;

    return (
        <Link href={`products/${variant.productId}`}>
            <Row className="h-[44px]">
                
                <Image 
                className="hidden sm:block" 
                src={imageSrc} 
                alt={variant.name} 
                width={40} 
                height={40} 
                />

                <Small className="min-w-[144px]">
                    {variant.name}</Small>
                
                <FlexBox className='flex-row items-center space-x-0 md:space-x-2 sm:grow'>
                    <IconWrapper iconColor='yellow' Icon={Icons.StarFilled} />
                    <Small>{variant.rating}</Small>
                </FlexBox>

                <Small
                    className={twMerge(
                        'flex flex-row justify-center w-max', 
                        variant.stock < (process.env.LOW_STOCK_THRESHOLD || 7) && 'text-error'
                        )}
                        >
                    {variant.stock.toString().padStart(2, '0')}&nbsp;
                    <Span className="hidden sm:block">in stock</Span>
                </Small>
                
                <Price
                basePrice={variant.basePrice} 
                salePrice={variant.salePrice}
                discount={variant.discount}
                showDiscount={true}
                showOriginalPrice={true}
                />
                
                <IconWrapper
                className="hidden sm:block" 
                iconSize={16} 
                Icon={Icons.Right}
                />
            </Row>
        </Link>
    );
}
