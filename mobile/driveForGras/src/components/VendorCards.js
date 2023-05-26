import React from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Shadow, Colors, Sizes, Fonts } from "../constants";

export default function VendorCards({ list, isLoading, showTitle = true }) {
  const navigation = useNavigation();

  const VendorCard = ({ vendor, index }) => {
    return (
      <TouchableOpacity
        style={{
          margin: Sizes.padding,
          padding: Sizes.padding3,
          width: Sizes.cardWidth,
          height: Sizes.cardHeight,
          borderRadius: Sizes.radius,
          backgroundColor: Colors.lightGray,
          ...Shadow,
        }}
        onPress={() => {
          navigation.navigate("VendorScreen", { vendor, index });
        }}
      >
        <Image
          source={{ uri: vendor.vendorLogo }}
          resizeMode="contain"
          style={{
            alignSelf: "center",
            width: 130,
            height: 130,
          }}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={Fonts.h3}>{vendor.publicName}</Text>

          <Text style={Fonts.body4}>{vendor.street}</Text>

          <Text style={Fonts.body4}>
            {vendor.city} {vendor.state} {vendor.zipcode}
          </Text>

          {/* <Text
            style={{
              ...Fonts.body3,
              marginTop: Sizes.padding,
            }}
          >
            {vendor.phone}
          </Text> */}
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
          <VendorCard key={index} index={index} vendor={item} />
        ))}
      </ScrollView>
    </View>
  );
}
