import { ProductVariantWithDetails, ProductWithDetails } from '@cd/data-access';
import { FlexBox, H6, Icons, IconWrapper, Paragraph, Price, Row } from '@cd/shared-ui';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ProductRowProps = {
    product: ProductWithDetails;
    variant?: ProductVariantWithDetails;
};

function ProductRow({ product, variant }: ProductRowProps) {
    const imageSrc = product.variants?.[0].images[0]?.location || variant?.images?.[0]?.location || false;
    return (
        <Link href={`products/${product.id}`}>
            <Row className="h-[44px]">
                {imageSrc && <Image className="hidden sm:block" src={imageSrc} alt="" width={40} height={40} />}
                <H6 className="grow">{product.name}</H6>
                {variant && (
                    <>
                        <Paragraph
                            className={twMerge('flex justify-center w-[60px]', variant.stock < 6 && 'text-error')}
                        >
                            {variant.stock.toString().padStart(2, '0')}{' '}
                            <Paragraph className={twMerge('flex justify-center w-[60px] text-dark')}>stock</Paragraph>
                        </Paragraph>
                        <H6 className="flex justify-center w-[80px]">
                            <Price price={variant.basePrice} />
                        </H6>
                    </>
                )}
                <FlexBox>
                    {/* <IconWrapper Icon={Icons.DottedStar} /> */}
                    <H6 className="flex justify-center w-[40px]">{product.rating} / 5</H6>
                </FlexBox>
                <IconWrapper Icon={Icons.Right} />
            </Row>
        </Link>
    );
}

export default ProductRow;
