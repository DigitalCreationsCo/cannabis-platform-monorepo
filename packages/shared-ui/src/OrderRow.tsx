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
        <Row className="h-[60px]">
          <H6>{ order.id }</H6>
          <Paragraph className={ twMerge("grow", `text-${getColor(order.status)}`) }>{ order.status }</Paragraph>
          <Paragraph className="flex justify-center w-[120px]">{ format(new Date(order.createdAt), "MMM dd, yyyy") }</Paragraph>
          <H6 className="flex justify-center w-[80px]"><Currency price={ order.total } /></H6>
          <IconWrapper Icon={ Icons.Right } />
        </Row>
      </Link>
    );
}

export default OrderRow;