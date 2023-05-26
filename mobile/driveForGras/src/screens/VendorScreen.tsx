// import React from "react";
// import {
//   Text
// } from "react-native";
// // import { Icons, Colors, Sizes, Fonts, Shadow } from "../constants";

// // import { BackButton, MenuItems, ShowBagButton } from "../components";
// // import { useSelector, useDispatch } from "react-redux";
// // import { getProductsByVendor } from "../redux/features/vendors";

// // create a process where the VendorScreen component will make a async request to
// // the backend, in getting the data for the products listed. These products will be
// // populated and memoized for the vendor object, saving from recurring network calls.

// // the async action is made to get products from the backend,
// // now i need some flag or way to observe if the products request has been made or not,
// // and if the products data is retrieve yet.
// // in order to conditionally make the api call or prevent it.

// const VendorScreen = ({ route }) => {
//   // const dispatch = useDispatch();

//   // const {
//   //   vendor,
//   //   vendor: { vendorId },
//   //   index,
//   // } = route.params;
//   // const { cart } = useSelector((state) => state);
//   // const vendorStore = useSelector((state) => state.vendors.vendors[index]);
//   // const [products, setProducts] = useState(vendorStore.products);

//   // useEffect(() => {
//   //   if (!vendor.productsFetched && vendor.products.length > 0) {
//   //     console.log("dispatching action...");
//   //     dispatch(getProductsByVendor({ vendorId, index }));
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   setProducts(vendorStore.products);
//   // }, [vendorStore]);

//   // return (
//   //   <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGray3 }}>
//   //     <BackButton />

//   //     {/* cover picture */}
//   //     <View
//   //       style={{
//   //         width: Sizes.width,
//   //         height: 140,
//   //         backgroundColor: Colors.blue,
//   //       }}
//   //     ></View>

//   //     <ScrollView
//   //       showsVerticalScrollIndicator={false}
//   //       style={{ paddingHorizontal: Sizes.padding2 }}
//   //     >
//   //       <Text style={{ ...Fonts.h1 }}>{vendor.publicName}</Text>
//   //       <Text style={{ ...Fonts.h4 }}>{vendor.tag}</Text>
//   //       <Text style={{ ...Fonts.body3 }}>
//   //         {vendor.street}
//   //         {", "}
//   //         {vendor.city}
//   //         {", "}
//   //         {vendor.state} {vendor.zipcode}
//   //       </Text>

//   //       <TouchableOpacity>
//   //         <View style={{ flexDirection: "row", alignItems: "center" }}>
//   //           <Icons.starOutline size={Sizes.body3} />

//   //           <Text style={{ ...Fonts.body3 }}>
//   //             {vendor.rating}
//   //             {"  "}
//   //             40-50 min{"  "}
//   //             $4.99 Delivery Fee
//   //           </Text>
//   //         </View>
//   //         <Text style={{ ...Fonts.body3 }}>Tap for hours, address, more</Text>
//   //       </TouchableOpacity>

//   //       <View
//   //         style={{
//   //           flexDirection: "row",
//   //           marginVertical: Sizes.padding,
//   //           height: 50,
//   //         }}
//   //       >
//   //         <TouchableOpacity
//   //           style={{
//   //             flex: 1,
//   //             flexDirection: "row",
//   //             backgroundColor: Colors.primary,
//   //             marginRight: Sizes.padding,
//   //             padding: Sizes.padding2,
//   //             alignItems: "center",
//   //             justifyContent: "center",
//   //             borderRadius: Sizes.radius / 2,
//   //             ...Shadow,
//   //           }}
//   //         >
//   //           <Icons.groupAdd size={Sizes.icon} color={Colors.white} />
//   //           <Text style={{ ...Fonts.h4, color: Colors.white }}>
//   //             {" "}
//   //             Group Order
//   //           </Text>
//   //         </TouchableOpacity>

//   //         <TouchableOpacity
//   //           style={{
//   //             flex: 1,
//   //             flexDirection: "row",
//   //             backgroundColor: Colors.primary,
//   //             marginLeft: Sizes.padding,
//   //             padding: Sizes.padding2,
//   //             alignItems: "center",
//   //             justifyContent: "center",
//   //             borderRadius: Sizes.radius / 2,
//   //             ...Shadow,
//   //           }}
//   //         >
//   //           <Icons.call size={Sizes.icon} color={Colors.white} />
//   //           <Text
//   //             style={{
//   //               ...Fonts.h4,
//   //               color: Colors.white,
//   //               marginRight: Sizes.padding2,
//   //             }}
//   //           >
//   //             {" "}
//   //             Call
//   //           </Text>
//   //         </TouchableOpacity>
//   //       </View>

//   //       <View
//   //         style={{
//   //           flexDirection: "row",
//   //           justifyContent: "space-between",
//   //           marginVertical: Sizes.padding2,
//   //           alignItems: "center",
//   //         }}
//   //       >
//   //         <Text style={{ ...Fonts.h2 }}>Menu</Text>

//   //         <TouchableOpacity
//   //           style={{
//   //             height: 40,
//   //             width: 40,
//   //             alignItems: "center",
//   //             justifyContent: "center",
//   //           }}
//   //         >
//   //           <Icons.search size={Sizes.icon} />
//   //         </TouchableOpacity>
//   //       </View>

//   //       <MenuItems list={products} />
//   //     </ScrollView>

//   //     {cart.isEmpty ? null : <ShowBagButton />}
//   //   </SafeAreaView>
//   // );
//   return (
//     <Text>Hello</Text>
//   )
// };

// export default VendorScreen;

import { Text, View } from 'react-native'
export default function VendorScreen() {
  return (
    <View>
      <Text>VendorScreen</Text>
    </View>
  )
}