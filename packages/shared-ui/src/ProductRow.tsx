import Link from "next/link";
import React from "react";
import { Product } from "@prisma/client";
import { Row, Currency, H6, Icons, IconWrapper, Paragraph } from ".";
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
        <Row>
          {/* { product.images[ 0 ]?.location && (
            <Image src={ product.images[ 0 ]?.location } alt={ product.name } width={ 100 } height={100} />
          )} */}
          <H6>{ product.name }</H6>
          <Paragraph className={ twMerge(product.quantity < 6 ? 'text-primary' : 'text-secondary') }>{ product.quantity.toString().padStart(2, "0") }</Paragraph>
          <H6><Currency price={ product.basePrice } /></H6>
          <div>
            <IconWrapper Icon={ Icons.Right } />
          </div>
        </Row>
      </Link>
    );
}

export default ProductRow;