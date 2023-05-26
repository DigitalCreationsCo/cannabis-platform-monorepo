import React from "react";
import { ScrollView } from "react-native";
import { CategoryCards, VendorCards, ProductCards } from "../components";
import { ListBuilder } from "../helpers";

export default function DeliveryView({ isLoading, vendors, products }) {
  return (
    <ScrollView>
      <CategoryCards isLoading={isLoading} />
      <VendorCards
        isLoading={isLoading}
        list={ListBuilder.YOUR_LOCAL_SHOPS(vendors)}
      />
      <ProductCards
        isLoading={isLoading}
        list={ListBuilder.FEATURED_PRODUCTS(products)}
      />
    </ScrollView>
  );
}
