// import React from "react";
// import {
//   View,
//   SafeAreaView,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { Icons, Colors, Sizes, Fonts, Shadow } from "../constants";

// import { BackButton, AddToBagButton } from "../components";
// import { UpdateBagButton, RemoveItemButton } from "../components/BagButton";

// const ProductScreen = ({ route }) => {
//   const { product } = route.params;

//   let {
//     productName,
//     productId,
//     productCategory,
//     description,
//     price,
//     unit,
//     smImage,
//     medImage,
//     quantity,
//   } = product;

//   const [itemQty, setItemQty] = React.useState(quantity);
//   const [readReviews, setReadReviews] = React.useState(false);

//   const editQty = (action) => {
//     if (action == "+") setItemQty(itemQty + 1);
//     else setItemQty(itemQty - 1);
//   };

//   let toCart = {
//     productName,
//     productId,
//     productCategory,
//     description,
//     price: parseFloat(price),
//     unit: parseFloat(unit),
//     smImage,
//     medImage,
//     quantity: parseFloat(itemQty),
//     subTotal: Number((price * itemQty).toFixed(2)),
//   };

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: Colors.white, alignItems: "center" }}
//     >
//       {/* Product Info */}
//       <BackButton />
//       {console.log(product.medImage)}
//       <Image
//         source={{ uri: product.medImage }}
//         resizeMode="contain"
//         style={{ width: 300, height: 300 }}
//       />
//       <Text style={{ ...Fonts.h1, color: Colors.black }}>
//         {product.productName}
//         <Text style={{ ...Fonts.body3 }}> {product.productCategory}</Text>
//       </Text>

//       <Text style={{ ...Fonts.body3, color: Colors.darkgray }}>
//         {product.description}
//       </Text>

//       <Text style={{ ...Fonts.body2, color: Colors.darkgray }}>
//         ${product.price} {product.unit} {product.quantityInStock} avail
//       </Text>

//       {/* Quantity Buttons */}
//       <View
//         style={{
//           flex: 1,
//           width: Sizes.width,
//           height: 50,
//           justifyContent: "center",
//           flexDirection: "row",
//           marginVertical: Sizes.padding2 * 2,
//         }}
//       >
//         <TouchableOpacity
//           disabled={itemQty <= 1}
//           style={{
//             width: 50,
//             height: 50,
//             backgroundColor: Colors.lightGray3,
//             alignItems: "center",
//             justifyContent: "center",
//             borderRadius: Sizes.radius * 2,
//           }}
//           onPress={() => editQty("-")}
//         >
//           <Text style={{ ...Fonts.h2 }}>-</Text>
//         </TouchableOpacity>

//         <View
//           style={{
//             width: 50,
//             height: 50,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text style={{ ...Fonts.h2 }}>{itemQty}</Text>
//         </View>

//         <TouchableOpacity
//           style={{
//             width: 50,
//             height: 50,
//             backgroundColor: Colors.lightGray3,
//             alignItems: "center",
//             justifyContent: "center",
//             borderRadius: Sizes.radius * 2,
//           }}
//           onPress={() => editQty("+")}
//         >
//           <Text style={{ ...Fonts.h2 }}>+</Text>
//         </TouchableOpacity>
//       </View>

//       <RemoveItemButton item={product} />

//       {/* Add to Bag Button */}
//       <UpdateBagButton itemQty={itemQty} toCart={toCart} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//     padding: Sizes.padding,
//   },
//   bottom: {
//     flex: 1,
//     width: Sizes.width,
//     justifyContent: "flex-end",
//   },
// });

// export default ProductScreen;
import { Text, View } from 'react-native'
export default function UpdateProductScreen() {
  return (
    <View>
      <Text>UpdateProductScreen</Text>
    </View>
  )
}