import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { PRODUCT_CATEGORIES } from "../constants/categories";

import { Colors, Sizes, Fonts, Shadow } from "../constants";

export default function CategoryCards({ isLoading }) {
  const [categories, setCategories] = React.useState(PRODUCT_CATEGORIES);

  const CategoryCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: Sizes.padding,
          backgroundColor: Colors.primary,
          borderRadius: Sizes.radius / 2,
          ...Shadow,
        }}
      >
        <Image
          source={item.productImage}
          style={{
            width: 80,
            height: 80,
          }}
        />
        <Text
          style={{
            height: 30,
            ...Fonts.h5,
            alignSelf: "center",
            paddingVertical: Sizes.padding,
            color: Colors.white,
          }}
        >
          {item.productType}
        </Text>
      </TouchableOpacity>
    );
  };

  const arr = [1, 2, 3, 4, 5];

  if (isLoading)
    return (
      <View style={{ marginVertical: Sizes.padding2 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {arr.map((i) => {
            return (
              <View
                key={i}
                style={{
                  marginHorizontal: Sizes.padding,
                  backgroundColor: Colors.primary,
                  borderRadius: Sizes.radius / 2,
                  ...Shadow,
                }}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: Colors.lightGray2,
                  }}
                ></View>
                <Text
                  style={{
                    height: 30,
                    ...Fonts.h5,
                    paddingVertical: Sizes.padding,
                    paddingLeft: Sizes.padding2,
                    color: Colors.white,
                  }}
                ></Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );

  return (
    <View style={{ marginVertical: Sizes.padding2 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={CategoryCard}
      />
    </View>
  );
}
