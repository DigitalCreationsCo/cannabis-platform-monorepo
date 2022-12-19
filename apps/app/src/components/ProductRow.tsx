import Link from "next/link";
import React from "react";
import { Product } from "@prisma/client";
import { Row, Currency, H6, Icons, IconWrapper, Paragraph } from "@cd/shared-ui";
import {format} from 'date-fns'
import { twMerge } from "tailwind-merge";
import Image from "next/image";

type ProductRowProps = {
    product: Product;
}

function ProductRow({ product }: ProductRowProps) {
    const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "default";
      case "Processing":
        return "primary";
      case "Delivered":
        return "secondary";
      case "Cancelled":
        return "default-soft";
      default:
        return "";
    }
    };
    
    return (
      <Link href={ `products/${product.id}` }>
        <Row className="h-[60px]">
          <Image className="hidden sm:block" src={ product.images[ 0 ]?.location } alt="" width={ 40 } height={40} />
          <H6 className="grow">{ product.name }</H6>
          <Paragraph className={ twMerge("flex justify-center w-[60px]", product.quantity < 6 ? 'text-primary' : 'text-secondary') }>{ product.quantity.toString().padStart(2, "0") }</Paragraph>
          <H6 className="flex justify-center w-[80px]"><Currency price={ product.basePrice } /></H6>
          <IconWrapper
          Icon={ Icons.Right } />
        </Row>
      </Link>
    );
}

export default ProductRow;