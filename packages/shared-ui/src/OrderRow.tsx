import Link from "next/link";
import React from "react";
import { Order } from "@prisma/client";
import { Row, Currency, H6, Icons, IconWrapper, Paragraph } from ".";
import {format} from 'date-fns'
import { twMerge } from "tailwind-merge";

type OrderRowProps = {
    order: Order;
    orderDetailsRoute: string;
}

function OrderRow({ order, orderDetailsRoute }: OrderRowProps) {
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
      <Link href={ `${orderDetailsRoute}/${order.id}` }>
        <Row>
          <H6>{ order.id }</H6>
          <Paragraph className={ twMerge(`text-${getColor(order.status)}`) }>{ order.status }</Paragraph>
          <Paragraph>{ format(new Date(order.createdAt), "MMM dd, yyyy") }</Paragraph>
        <H6><Currency price={ order.total } /></H6>
        <div>
          <IconWrapper Icon={ Icons.Right } />
        </div>
        </Row>
      </Link>
    );
}

export default OrderRow;