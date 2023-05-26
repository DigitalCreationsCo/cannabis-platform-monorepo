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

// // show vendorname, and logo in the product screen

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
//   } = product;

//   const [itemQty, setItemQty] = React.useState(1);
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
//       style={{
//         flex: 1,
//         justifyContent: "space-between",
//         backgroundColor: Colors.white,
//         alignItems: "center",
//       }}
//     >
//       {/* Product Info */}
//       <BackButton />

//       <View>
//         <Image
//           source={{ uri: product.medImage }}
//           resizeMode="contain"
//           style={{ width: 300, height: 300 }}
//         />
//         <Text style={{ ...Fonts.h1, color: Colors.black }}>
//           {product.productName}
//           <Text style={{ ...Fonts.body3 }}> {product.productCategory}</Text>
//         </Text>

//         <Text style={{ ...Fonts.body3, color: Colors.darkgray }}>
//           {product.description}
//         </Text>

//         <Text style={{ ...Fonts.body2, color: Colors.darkgray }}>
//           ${product.price} {product.unit} {product.quantityInStock} avail
//         </Text>
//       </View>

//       {/* Quantity Buttons */}
//       <View
//         style={{
//           width: Sizes.width,
//           height: 50,
//           justifyContent: "center",
//           flexDirection: "row",
//           marginVertical: Sizes.padding2,
//         }}
//       >
//         <TouchableOpacity
//           disabled={itemQty <= 1}
//           style={{
//             width: 50,
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
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text style={{ ...Fonts.h2 }}>{itemQty}</Text>
//         </View>

//         <TouchableOpacity
//           style={{
//             width: 50,
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

//       {/* Reviews Component */}
//       <View style={{ flex: 1, width: Sizes.width - Sizes.padding3 * 2 }}>
//         {readReviews ? (
//           <FlatList
//             showsVerticalScrollIndicator={true}
//             data={product.reviews}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={{ paddingHorizontal: Sizes.padding2 }}
//             renderItem={({ item }) => (
//               <View
//                 style={{
//                   backgroundColor: Colors.lightGray,
//                   marginVertical: Sizes.padding,
//                   padding: Sizes.padding2,
//                 }}
//               >
//                 <Text style={{ color: Colors.darkgray }}>{item.comment}</Text>
//                 <Text style={{ color: Colors.darkgray, alignSelf: "center" }}>
//                   {item.customerName} rated a {item.rating}
//                 </Text>
//               </View>
//             )}
//           />
//         ) : (
//           <View style={{ alignItems: "center" }}>
//             <Text style={{ ...Fonts.body4, color: Colors.darkgray }}>
//               What's the word on this product?
//             </Text>
//             <TouchableOpacity onPress={() => setReadReviews(!readReviews)}>
//               <Text style={{ ...Fonts.body4 }}>Read reviews</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* Add to Bag Button */}
//       <AddToBagButton itemQty={itemQty} toCart={toCart} />
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
const ProductScreen = () => {
  return (
    <View>
      <Text>ProductScreen</Text>
    </View>
  )
}
export default ProductScreen