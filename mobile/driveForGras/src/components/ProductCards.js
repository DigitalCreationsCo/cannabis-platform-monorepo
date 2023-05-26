import React from "react";
import { ScrollView, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Sizes, Fonts, Colors, Shadow } from "../constants";

export default function ProductCards({ list, isLoading, showTitle = true }) {
  const navigation = useNavigation();

  const ProductCard = ({ product, index }) => {
    return (
      <TouchableOpacity
        style={{
          width: 180,
          margin: Sizes.padding,
          padding: Sizes.padding3,
          borderRadius: Sizes.radius,
          backgroundColor: Colors.lightGray,
          ...Shadow,
        }}
        onPress={() => {
          navigation.navigate("ProductScreen", { product });
        }}
      >
        <Image
          source={{ uri: product.smImage }}
          resizeMode="contain"
          style={{
            borderRadius: Sizes.radius / 2,
            marginBottom: Sizes.padding,
            alignSelf: "center",
            width: 100,
            height: 100,
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ ...Fonts.h4Light }}>
            {product.productName}{" "}
            <Text style={{ ...Fonts.body4 }}>{product.unit}g</Text>
          </Text>

          <Text style={{ flex: 1, ...Fonts.body4 }}>
            {product.description?.length > 38
              ? product.description.substring(0, 37) + "..."
              : product.description}
          </Text>

          <Text style={{ ...Fonts.body4 }}>from {product.publicName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const listData = list?.data;

  if (isLoading || !list)
    return (
      <>
        <View style={{ height: 30 }}></View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              margin: Sizes.padding2,
              padding: Sizes.padding3,
              width: Sizes.cardWidth,
              height: Sizes.cardHeight,
              borderRadius: Sizes.radius,
              backgroundColor: Colors.lightGray,
              ...Shadow,
            }}
          ></View>
          <View
            style={{
              margin: Sizes.padding2,
              padding: Sizes.padding3,
              width: Sizes.cardWidth,
              height: Sizes.cardHeight,
              borderRadius: Sizes.radius,
              backgroundColor: Colors.lightGray,
              ...Shadow,
            }}
          ></View>
        </View>
      </>
    );

  return (
    <View>
      {showTitle ? (
        <Text style={{ height: 30, ...Fonts.h2 }}>{list.title}</Text>
      ) : (
        <></>
      )}

      <ScrollView
        horizontal // Change the direction to horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled // Enable paging
        decelerationRate={0} // Disable deceleration
        snapToInterval={Sizes.cardWidth + 10} // Calculate the size for a card including marginLeft and marginRight
        snapToAlignment="center" // Snap to the center
        contentInset={{
          // iOS ONLY
          top: 0,
          left: 0, // Left spacing for the very first card
          bottom: 0,
          right: Sizes.cardSpacingInset, // Right spacing for the very last card
        }}
        contentContainerStyle={{
          paddingRight:
            Platform.OS === // contentInset alternative for Android
            "android"
              ? Sizes.cardSpacingInset
              : 0, // Horizontal spacing before and after the ScrollView
        }}
      >
        {listData?.map((item, index) => (
          <ProductCard key={index} index={index} product={item} />
        ))}
      </ScrollView>
    </View>
  );
}
