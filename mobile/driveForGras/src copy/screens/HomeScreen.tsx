import { Text, View } from 'react-native'
export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

// import * as Location from "expo-location";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView, Text, View } from "react-native";

// import { useDispatch, useSelector } from "react-redux";
// // import { getProducts } from "../redux/features/products";
// // import { getVendors } from "../redux/features/vendors.js.js";

// // import {
// //     Greeting,
// //     LocationHeader,
// //     SetStateButton,
// //     ShowBagButton
// // } from "../components";
// // import { Colors, Fonts } from "../constants";
// // import { DeliveryView, PickupView } from "../views";

// const HomeScreen = () => {

//   const dispatch = useDispatch();

//   // const [location, setLocation] = useState(null);
//   // const [searchRadius, setSearchRadius] = useState(10000000);

//   // const vendorStore = useSelector((state) => state.vendors.vendors);
//   // const [vendors, setVendors] = useState(null);
//   // const productStore = useSelector((state) => state.products.products);
//   // const [products, setProducts] = useState(null);
//   // const { cart } = useSelector((state) => state);

//   // const [isLoading, setIsLoading] = useState(true);
//   // const [pickupViewEnabled, setPickupViewEnabled] = useState(false);

//   // const featuredShops = curateFeaturedShops(vendors)
//   // const favoriteShops = curateFavoriteShops(vendors)
//   // Curate function has to return a object that holds a title and data
//   //

//   // i want to refactor the vendor cards so
//   // that the card component makes a fetch
//   // request for the product data sorted
//   // according to the ListBuilder method.

//   // I will have to refactor to implement the
//   // infinite scrollview in the product cards component.
//   // the way the inifinite scrolling will work is:
//   // the component will track the pagenumber,
//   // and make a fetch call when the scroll threshold is reached.
//   // will send a dispatch to fetch the data, and
//   // the payload will be pushed to the products array
//   // that will exist inside the productcards component.

//   // Each component will be a self-contained fetcher
//   // with infinite scroll.

//   // Just an idea. Not going to do it now,
//   // as the practical use is not there currently. :P

//   const getVendorsAndProductsAsync = async (location, searchRadius) => {
//     dispatch(getVendors({ location, searchRadius }))
//       .then((result) => {
//         let vendorIdList = result.payload.map((v) => v.vendorId);
//         dispatch(getProducts({ vendorIdList }));
//       })
//       .then(setIsLoading(false));
//   };

//   useEffect(async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       console.log("Location permission was denied.");
//       return;
//     }

//     const position = await Location.getCurrentPositionAsync();
//     let {
//       coords: { longitude, latitude },
//     } = position;

//     setLocation([longitude, latitude]);
//   }, []);

//   useEffect(() => {
//     if (location !== null) {
//       getVendorsAndProductsAsync(location, searchRadius);
//     }
//   }, [location]);

//   useEffect(() => {
//     if (vendorStore !== null) {
//       setVendors(vendorStore);
//     }
//     if (productStore !== null) {
//       setProducts(productStore);
//     }
//   }, [vendorStore, productStore]);

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: Colors.lightGray3,
//       }}
//     >
//       <Text style={{ ...Fonts.h2, color: Colors.primary }}>
//         Cannabis Delivery
//       </Text>

//       {/* FOR TESTING ASYNC LOADING 
//       {vendors ? <Text>Vendors Fetched</Text> : <Text>No Vendors</Text>}
//       <Text>{location?.join(", ")}</Text>
//       <Text>isLoading? {isLoading ? "true" : "false"}</Text> */}

//       <Greeting isLoading={isLoading} />

//       <View style={{ flexDirection: "row" }}>
//         <LocationHeader location={location} />
//         <SetStateButton setState={setPickupViewEnabled} bool={false}>
//           <Text>Delivery</Text>
//         </SetStateButton>
//         <SetStateButton setState={setPickupViewEnabled} bool={true}>
//           <Text>Pickup</Text>
//         </SetStateButton>
//       </View>

//       <View>
//         {pickupViewEnabled ? (
//           <PickupView isLoading={isLoading} vendors={vendors} />
//         ) : (
//           <DeliveryView
//             isLoading={isLoading}
//             vendors={vendors}
//             products={products}
//           />
//         )}
//       </View>

//       {cart.isEmpty ? <></> : <ShowBagButton />}
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;