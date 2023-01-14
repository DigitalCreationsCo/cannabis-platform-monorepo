import Link from 'next/link';
import React from 'react';
import { Product } from '@prisma/client';
import { Row, Price, H6, Icons, IconWrapper, Paragraph, FlexBox } from '@cd/shared-ui';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { ProductWithDetails } from '@cd/data-access';

type ProductRowProps = {
    product: ProductWithDetails;
};

function ProductRow({ product }: ProductRowProps) {
    const getColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'default';
            case 'Processing':
                return 'primary';
            case 'Delivered':
                return 'secondary';
            case 'Cancelled':
                return 'default-soft';
            default:
                return '';
        }
    };

    return (
        <Link href={`products/${product.id}`}>
            <Row className="h-[44px]">
                {product.variants?.[0].images[0] && (
                    <Image
                        className="hidden sm:block"
                        src={product.variants[0].images[0].location}
                        alt=""
                        width={40}
                        height={40}
                    />
                )}
                <H6 className="grow">{product.name}</H6>
                {/* <Paragraph className={ twMerge("flex justify-center w-[60px]", product.stock < 6 && 'text-error') }>{ product.stock.toString().padStart(2, "0") }</Paragraph> */}
                {/* <H6 className="flex justify-center w-[80px]"><Price price={ product.basePrice } /></H6> */}
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
