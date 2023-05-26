// import React, { useRef, useState, useEffect } from "react";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import apiKeys from "../helpers/apiKey";
// import { useSelector } from "react-redux";
// import Selector from "../redux/selector";
// import { Colors, Fonts } from "../constants";
// import { useLocationWatch } from "../hooks";
// import VendorDeliveryView from "./VendorDeliveryView";
// import CustomerDeliveryView from "./CustomerDeliveryView";

// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.016;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// // this screen contains logic to display the orders in the best order
// // for effective delivery, based on location, and destination

// export default function DeliverOrderView({
//   dispatchOrders,
//   remainingRoute,
//   currentOrder,
//   destinationType,
//   currentDestination,
// }) {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(false);
//   }, [remainingRoute]);

//   const mapRef = useRef();
//   const location = useSelector(Selector.currentCoordinates);
//   useLocationWatch();

//   const driverCoords = {
//     latitude: location[1],
//     longitude: location[0],
//   };
//   const vendorCoords = {
//     latitude: Number(currentOrder?.vendor.location.coordinates[1]),
//     longitude: Number(currentOrder?.vendor.location.coordinates[0]),
//   };
//   const customerCoordsList = remainingRoute?.map((order) => ({
//     latitude: Number(order?.customer.location.geoLocation.coordinates[1]),
//     longitude: Number(order?.customer.location.geoLocation.coordinates[0]),
//   }));
//   const customerCoordsListWithoutLastDestination = customerCoordsList.slice(
//     0,
//     -1
//   );
//   const lastDestinationIndex = customerCoordsList.length - 1;

//   const activePoints = () => {
//     if (destinationType === "vendor")
//       return [vendorCoords].concat(customerCoordsList);
//     if (destinationType === "customer") return customerCoordsList;
//   };

//   const activeWaypoints = () => {
//     if (destinationType === "vendor")
//       return [vendorCoords].concat(customerCoordsListWithoutLastDestination);
//     if (destinationType === "customer")
//       return customerCoordsListWithoutLastDestination;
//   };

//   const activeCoordinatePoints = activePoints();
//   const activeCoordinateWayPoints = activeWaypoints();

//   const fitAllCoordinates = () => {
//     if (mapRef.current) {
//       mapRef.current.fitToCoordinates(
//         [driverCoords].concat(activeCoordinatePoints),
//         {
//           edgePadding: {
//             top: 100,
//             left: 60,
//             right: 60,
//             bottom: 100,
//           },
//           animated: true,
//         }
//       );
//     }
//   };

//   const getDirections = () => {
//     console.log("getting navigation directions... X");
//   };
//   const dialPhone = () => {
//     console.log("dialing phone... X");
//   };

//   const DeliveryInfoComponent = (props) => {
//     const Views = (props) =>
//       Object.freeze({
//         vendor: <VendorDeliveryView {...props} />,
//         customer: <CustomerDeliveryView {...props} />,
//       });
//     return Views(props)[destinationType];
//   };

//   return (
//     <>
//       {remainingRoute && currentOrder && (
//         <View style={styles.container}>
//           {/* <Text style={{ ...Fonts.body4, padding: 10 }}>{message}</Text> */}
//           <MapView
//             ref={mapRef}
//             initialRegion={fitAllCoordinates()}
//             style={{ height: "50%", width }}
//             provider={PROVIDER_GOOGLE}
//           >
//             <Marker title={"driver-point"} coordinate={driverCoords} />
//             {destinationType === "vendor" && (
//               <Marker title={"vendor-point"} coordinate={vendorCoords} />
//             )}
//             {customerCoordsList?.map((point, index) => (
//               <Marker
//                 key={index + Date.now()}
//                 title={`${remainingRoute?.[index]?.customer?.firstName}`}
//                 coordinate={point}
//               />
//             ))}
//             <MapViewDirections
//               origin={driverCoords}
//               waypoints={activeCoordinateWayPoints}
//               destination={customerCoordsList[lastDestinationIndex]}
//               apikey={apiKeys.GOOGLE_MAP_API_KEY()}
//               strokeColor={Colors.primary}
//               strokeWidth={4}
//               precision={"low"}
//               channel={"driver_mobile_client"}
//             />
//           </MapView>
//           <DeliveryInfoComponent
//             dispatchOrders={dispatchOrders}
//             destinationType={destinationType}
//             currentOrder={currentOrder}
//             remainingRoute={remainingRoute}
//             currentDestination={currentDestination}
//             getDirections={getDirections}
//             dialPhone={dialPhone}
//           />
//         </View>
//       )}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
// });

import { Text, View } from 'react-native'
export default function DeliverOrderView() {
  return (
    <View>
      <Text>DeliverOrderView</Text>
    </View>
  )
}