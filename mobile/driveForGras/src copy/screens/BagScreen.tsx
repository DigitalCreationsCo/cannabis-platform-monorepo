// import React from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { Colors, Fonts, Icons, Shadow, Sizes } from "../constants";

// import { useNavigation } from "@react-navigation/native";

// import { useSelector, useDispatch } from "react-redux";

// export default function BagScreen() {
//   const navigation = useNavigation();

//   const { cart, subTotal, totalItems } = useSelector((state) => state.cart);

//   return (
//     <>
//       {/* if there are no items in the cart, return to the last screen in the stack.
//         This approach may be prone to bugs, find a way to also safely disable checkout button */}
//       {totalItems <= 0 ? (
//         navigation.pop()
//       ) : (
//         <SafeAreaView
//           style={{
//             borderTopLeftRadius: Sizes.radius,
//             borderTopRightRadius: Sizes.radius,
//             backgroundColor: Colors.primary,
//           }}
//         >
//           <View
//             style={{
//               marginVertical: Sizes.padding3,
//               alignSelf: "center",
//               width: 100,
//               height: 4,
//               borderRadius: Sizes.radius,
//               backgroundColor: Colors.lightGray,
//               ...Shadow,
//             }}
//           ></View>

//           <View
//             style={{
//               paddingHorizontal: Sizes.padding,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <View style={{ marginLeft: Sizes.padding3, width: 60 }}>
//               <Icons.flower size={Sizes.icon} color={Colors.white} />
//             </View>
//             <Text
//               style={{
//                 justifyContent: "center",
//                 textAlign: "center",
//                 ...Fonts.h4,
//                 color: Colors.white,
//               }}
//             >
//               My Bag
//             </Text>

//             <TouchableOpacity
//               style={{
//                 padding: Sizes.padding2,
//                 alignSelf: "flex-end",
//                 borderRadius: Sizes.radius / 2,
//                 backgroundColor: Colors.primary,
//               }}
//               onPress={() => navigation.pop()}
//             >
//               <Text style={{ ...Fonts.h4, color: Colors.white }}>Close</Text>
//             </TouchableOpacity>
//           </View>

//           <View
//             style={{
//               backgroundColor: Colors.lightGray,
//               paddingTop: Sizes.padding,
//             }}
//           >
//             {cart?.map((product, index) => (
//               <TouchableOpacity
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   backgroundColor: Colors.white,
//                   ...Shadow,
//                   marginBottom: Sizes.padding,
//                   paddingHorizontal: Sizes.padding3 * 2,
//                 }}
//                 onPress={() => {
//                   navigation.navigate("UpdateProductScreen", { product });
//                 }}
//                 key={index}
//               >
//                 <Text style={{ flex: 1, ...Fonts.body4 }}>
//                   {product.productName}
//                   {"\n"}
//                   <Text style={{ color: Colors.darkgray }}>
//                     {product.description}
//                   </Text>
//                 </Text>
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     height: 30,
//                     width: 30,
//                     backgroundColor: Colors.light,
//                     ...Fonts.h3,
//                   }}
//                 >
//                   {product.quantity}
//                 </Text>
//                 <Image
//                   source={{ uri: product.smImage }}
//                   style={{ width: 60, height: 60 }}
//                 />
//                 <Text style={{ textAlign: "right", ...Fonts.body3, width: 80 }}>
//                   ${product.subTotal}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               backgroundColor: Colors.white,
//               padding: Sizes.padding3 * 2,
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Text>Subtotal</Text>
//             <Text style={{ textAlign: "right", ...Fonts.body3, width: 80 }}>
//               ${subTotal}
//             </Text>
//           </View>

//           <View style={{ backgroundColor: Colors.white }}>
//             <TouchableOpacity
//               disabled={() => totalItems >= 0}
//               style={{
//                 width: "95%",
//                 alignSelf: "center",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: Colors.primary,
//                 borderRadius: Sizes.radius / 2,
//                 marginHorizontal: Sizes.padding3,
//                 padding: Sizes.padding3 * 2,
//                 ...Shadow,
//               }}
//               onPress={() => navigation.navigate("BagScreen")}
//             >
//               <Text style={{ ...Fonts.h2, color: Colors.white }}>Checkout</Text>
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       )}
//     </>
//   );
// }

import { Text, View } from 'react-native'
const BagScreen = () => {
  return (
    <View>
      <Text>BagScreen</Text>
    </View>
  )
}
export default BagScreen