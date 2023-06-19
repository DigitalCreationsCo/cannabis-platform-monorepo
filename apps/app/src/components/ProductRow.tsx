import { ProductVariantWithDetails } from '@cd/data-access';
import { FlexBox, H6, Icons, IconWrapper, Paragraph, Price, Row } from '@cd/ui-lib';
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

                <H6 className="grow">
                    {variant.name}</H6>

                <Paragraph
                    className={twMerge(
                        'flex flex-row justify-center w-max', 
                        variant.stock < (process.env.LOW_STOCK_THRESHOLD || 7) && 'text-error'
                        )}
                        >
                    {variant.stock.toString().padStart(2, '0')} in stock
                </Paragraph>
                
                <H6 className="">
                    <Price className='border'
                    basePrice={variant.basePrice} 
                    salePrice={variant.salePrice}
                    discount={variant.discount}
                    showDiscount={true}
                    showOriginalPrice={true}
                    />
                </H6>

                <FlexBox className='flex-row'>
                    <IconWrapper iconColor='yellow' Icon={Icons.StarFilled} />
                    <H6>{variant.rating} / 5</H6>
                </FlexBox>
                <IconWrapper Icon={Icons.Right} />
            </Row>
        </Link>
    );
}
