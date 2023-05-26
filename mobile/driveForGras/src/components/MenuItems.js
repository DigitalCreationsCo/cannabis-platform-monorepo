import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Fonts, Shadow, Sizes, SvgIcons } from "../constants";

function MenuItems({ list, inCart }) {
  const navigation = useNavigation();
  const MenuItem = ({ product }) => (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.lightGray3,
          marginVertical: Sizes.padding,
          paddingLeft: Sizes.padding3,
          borderWidth: 1,
          borderRadius: Sizes.radius,
          borderColor: Colors.primary,
          ...Shadow,
        }}
        onPress={() => {
          navigation.navigate("ProductScreen", { product });
        }}
      >
        <View style={{ justifyContent: "center", flexShrink: 1 }}>
          <Text style={{ ...Fonts.h4 }}>{product.productName}</Text>

          <Text style={{ ...Fonts.body3 }}>${product.price}</Text>

          <Text
            style={{
              flexShrink: 1,
              ...Fonts.body4,
            }}
          >
            {product.description?.length > 38
              ? product.description.substring(0, 37) + "..."
              : product.description}
          </Text>
        </View>
        <View style={{ width: 100, height: 100 }}>
          <Image
            source={{ uri: product.smImage }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderTopRightRadius: Sizes.radius,
              borderBottomRightRadius: Sizes.radius,
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <ScrollView>
      {list.length > 0 ? (
        list?.map((item, index) => {
          const badge = inCart?.find((el) => el.id == item.productId);
          return (
            <View key={`product-${index}`}>
              {
                /* for each item in the cart, add a item badge */
                badge ? (
                  <SvgIcons.cartBadge
                    key={`badge-${index}`}
                    fill={Colors.primary}
                    stroke={Colors.primary}
                  >
                    {badge.quantity}
                  </SvgIcons.cartBadge>
                ) : null
              }

              <MenuItem key={index} product={item} />
            </View>
          );
        })
      ) : (
        <Text style={{ ...Fonts.body3 }}>No products are available</Text>
      )}
    </ScrollView>
  );
}

export default MenuItems;
