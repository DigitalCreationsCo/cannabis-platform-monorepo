// import React, { useState, useRef } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { ShowBagButton } from "../components";
// import { Sizes, Fonts, Icons, Colors, Shadow } from "../constants";

// import { useSelector } from "react-redux";

// const SearchScreen = () => {
//   const { cart } = useSelector((state) => state);
//   const { products } = useSelector((state) => state.products);
//   const _textInput = useRef(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   //this screen displays a search bar for searching products, in the products DB, with searching first in the local vendor datastore, then in the wider db based on proximity to the user, args: (searchTerms, proximityRadius)

//   // the screen also shows products and vendors in the local data store, presenting a grid of products offered by local vendors,
//   // sorted based on recently viewed, popularity, user favorites, etc... :)

//   randomProducts = () => {
//     let randomProducts = [];
//     for (let i = 0; i < 6; i++) {
//       let r = Math.floor(Math.random() * (products.length - 1));
//       randomProducts.push(products[r]);
//     }
//     return randomProducts;
//   };
//   randomProducts();

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}
//     >
//       <View
//         style={{
//           height: 50,
//           flexDirection: "row",
//           alignItems: "center",
//           backgroundColor: Colors.primary,
//           paddingHorizontal: Sizes.padding2,
//           width: Sizes.width,
//           justifyContent: "center",
//         }}
//       >
//         <Icons.search color={Colors.white} size={Sizes.body2} />
//         <View
//           style={{
//             flex: 1,
//             paddingRight: Sizes.padding,
//             paddingVertical: Sizes.padding,
//             marginLeft: Sizes.padding,
//             justifyContent: "space-between",
//             alignContent: "center",
//             alignItems: "center",
//             flexDirection: "row",
//             backgroundColor: Colors.lightGray3,
//             borderRadius: Sizes.radius / 2,
//           }}
//         >
//           <TextInput
//             ref={_textInput}
//             style={{
//               ...Fonts.body3,
//               flex: 1,
//               height: 25,
//               marginHorizontal: Sizes.padding2,
//             }}
//             placeholder={"search"}
//             placeholderTextColor={Colors.darkgray}
//             value={searchTerm}
//             onChangeText={(text) => setSearchTerm(text)}
//           />

//           <TouchableWithoutFeedback onPress={() => setSearchTerm("")}>
//             <View>
//               {searchTerm ? (
//                 <Icons.close color={Colors.black} size={Sizes.body2} />
//               ) : (
//                 <></>
//               )}
//             </View>
//           </TouchableWithoutFeedback>
//         </View>
//       </View>

//       <FlatList
//         style={{
//           flex: 1,
//           flexDirection: "row",
//           flexWrap: "wrap",
//         }}
//         data={randomProducts()}
//         renderItem={(product, index) => (
//           <TouchableOpacity
//             key={`product-${index}`}
//             style={{
//               width: "45%",
//               margin: Sizes.padding,
//               padding: Sizes.padding3,
//               backgroundColor: Colors.lightGray,
//               ...Shadow,
//             }}
//             // onPress={() => {
//             //   navigation.navigate("ProductScreen", { product });
//             // }}
//           >
//             <Image
//               source={{ uri: product.smImage }}
//               resizeMode="contain"
//               style={{
//                 borderRadius: Sizes.radius / 2,
//                 marginBottom: Sizes.padding,
//                 alignSelf: "center",
//                 width: 80,
//                 height: 80,
//               }}
//             />
//             <View>
//               <Text style={{ ...Fonts.h4Light }}>
//                 {product.productName}{" "}
//                 <Text style={{ ...Fonts.body4 }}>{product.unit}g</Text>
//               </Text>

//               <Text style={{ ...Fonts.body4 }}>{product.productCategory}</Text>

//               <Text style={{ justifyContent: "flex-end", ...Fonts.body4 }}>
//                 from {product.publicName}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       {cart.isEmpty ? null : <ShowBagButton />}
//     </SafeAreaView>
//   );
// };

// export default SearchScreen;

import { Text, View } from 'react-native';
const SearchScreen = () => {
	return (
		<View>
			<Text>SearchScreen</Text>
		</View>
	);
};
export default SearchScreen;
