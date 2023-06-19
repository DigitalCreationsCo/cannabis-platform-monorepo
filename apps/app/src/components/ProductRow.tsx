import { ProductVariantWithDetails } from '@cd/data-access';
import { FlexBox, Icons, IconWrapper, Price, Row, Small } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

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
                height={40} />

                <Small className="min-w-[166px]">
                    {variant.name}</Small>
                
                <FlexBox className='flex-row items-center space-x-1 sm:grow'>
                    <IconWrapper iconColor='yellow' Icon={Icons.StarFilled} />
                    <Small>{variant.rating}</Small>
                </FlexBox>

                <Small
                    className={twMerge(
                        'flex flex-row justify-center w-max', 
                        variant.stock < (process.env.LOW_STOCK_THRESHOLD || 7) && 'text-error'
                        )}
                        >
                    {variant.stock.toString().padStart(2, '0')} in stock
                </Small>
                
                <Price
                basePrice={variant.basePrice} 
                salePrice={variant.salePrice}
                discount={variant.discount}
                showDiscount={true}
                showOriginalPrice={true}
                />
                
                {/* <IconWrapper Icon={Icons.Right} /> */}
            </Row>
        </Link>
    );
}
