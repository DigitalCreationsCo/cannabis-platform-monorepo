// // simple dispatch testing client

// import React, { useState, useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
// import * as Location from "expo-location";
// import {
//   Dimensions,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   View,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import socketIO from "socket.io-client";
// import { Colors, Sizes, Fonts } from "../constants";
// import { Greeting } from "../components";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addDispatchSocket,
//   removeDispatchSocket,
// } from "../redux/features/socket";
// import { currentLocationUpdate } from "../redux/features/user";
// import { urlTable } from "../helpers/urlTable";

// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.00922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const OnlineStatus = {
//   ONLINE: "online",
//   PENDING: "pending",
//   OFFLINE: "offline",
//   ERROR: "error",
// };

// let dispatchSocket;
// createSocket = () => {
//   if (dispatchSocket) {
//     return;
//   } else {
//     return (dispatchSocket = socketIO(urlTable.DISPATCH_CONNECT(), {
//       autoConnect: true,
//       // transports: ["websocket"],
//       jsonp: false,
//     }));
//   }
// };

// const MapScreen = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);
//   const { driverId } = user;

//   const navigation = useNavigation();

//   const [location, setLocation] = useState(null);
//   const locationList = [
//     location,
//     [-122.4083, 37.789],
//     [-122.4082, 37.788],
//     [-122.4081, 37.787],
//   ];
//   let locationIndex = 0;

//   const [updateStatus, setUpdateStatus] = useState(false);
//   const [onlineStatus, setOnlineStatus] = useState(OnlineStatus.OFFLINE);
//   const [websocketConnectionStatus, setWebsocketConnectionStatus] =
//     useState(false);
//   const [connectionError, setConnectionError] = useState("");
//   const [message, setMessage] = useState("");

//   const toggleStatus = () => {
//     setUpdateStatus((status) => !status);
//   };

//   const sendLocation = () => {
//     console.info("sharing location ", locationIndex);
//     dispatchSocket.emit("locationShare", {
//       type: "LOCATION_SHARE",
//       data: {
//         location: {
//           type: "Point",
//           coordinates: locationList[locationIndex],
//         },
//       },
//     });
//     locationIndex++;
//     console.info("location list length: ", locationList.length);
//     if (locationIndex > locationList.length) {
//       locationIndex = 0;
//     }
//     console.info("location index after sharing: ", locationIndex);
//   };

//   useEffect(() => {
//     setOnlineStatus(OnlineStatus.PENDING);
//     // setConnectionError("");
//     fetch("http://127.0.0.1:6001/api/v1/drivers/onlineStatus", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ driverId, updateStatus }),
//     })
//       .then((response) => response.json())
//       .then(
//         (data) => {
//           if (updateStatus === true) {
//             if (data.error) {
//               setConnectionError("An error occured while going online.");
//               setOnlineStatus(OnlineStatus.OFFLINE);
//             } else {
//               setOnlineStatus(OnlineStatus.ONLINE);
//             }
//           } else {
//             setOnlineStatus(OnlineStatus.OFFLINE);
//           }
//         },
//         (err) => {
//           console.info("ERROR THROWN: ", err);
//           setConnectionError(err.message);
//           if (updateStatus === true) {
//             setConnectionError("An error occured while going online.");
//             setOnlineStatus(OnlineStatus.OFFLINE);
//             setUpdateStatus(false);
//           }
//         }
//       );

//     // add code to switch onlineStatus to false for unmount.
//     // as well as a handler in the auth service to change status
//     // from the server side, for disconnected users.
//   }, [updateStatus]);

//   useEffect(() => {
//     if (onlineStatus === OnlineStatus.ONLINE) {
//       console.info("connecting to dispatch server..");
//       createSocket();

//       dispatchSocket.on("connection", (message) => {
//         console.info(message);
//         setWebsocketConnectionStatus(true);
//         dispatchSocket.emit("driverConnect", { driverId });
//       });

//       dispatchSocket.on("new_order", ({ message, order }) => {
//         console.info(message);
//         navigation.navigate("NewOrderScreen", {
//           message,
//           order,
//           socket: dispatchSocket,
//         });
//       });

//       dispatchSocket.on("order_assigned", ({ message }) => {
//         console.info(message);
//         setMessage(message);
//       });

//       dispatchSocket.on("order_assigned_to_another_driver", ({ message }) => {
//         setRespondToOrder(false);
//         setMessage(message);
//         setCurrentOrder({});
//       });

//       dispatchSocket.on("get_location", () => {
//         sendLocation();
//       });

//       dispatchSocket.on("navigate", ({ type }) => {
//         console.info("navigation event: ", type);
//       });

//       dispatchSocket.on("message", ({ type, message, data }) => {
//         console.info(
//           `type: ${type},
//           message: ${message},
//           data: ${data}`
//         );
//       });
//       dispatchSocket.on("disconnect", () => {
//         console.info("disconnecting from room");
//       });
//     }
//   }, [onlineStatus === OnlineStatus.ONLINE]);

//   useEffect(() => {
//     if (dispatchSocket) {
//       console.info("disconnecting from dispatch..");
//       dispatchSocket.close();
//       console.info("disconnected");
//       dispatchSocket = null;
//       setWebsocketConnectionStatus(false);
//     }
//   }, [onlineStatus === OnlineStatus.OFFLINE]);

//   useEffect(async () => {
//     // put location coords in the state
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       console.info("Location permission was denied.");
//       return;
//     }
//     const position = await Location.getCurrentPositionAsync();
//     let {
//       coords: { longitude, latitude },
//     } = position;
//     // console.info("long: ", longitude, " lat: ", latitude);
//     // setLocation([longitude, latitude]);
//     setLocation([-122.408417, 37.79]);
//   }, []);

//   useEffect(() => {
//     if (location)
//       dispatch(
//         currentLocationUpdate({
//           geoLocation: {
//             type: "Point",
//             coordinates: location,
//           },
//         })
//       );
//   }, [location]);

//   return (
//     <SafeAreaView style={{}}>
//       <Greeting isLoading={true} />

//       <View style={{ height: height - 295, padding: 5 }}>
//         <MapView
//           showsUserLocation
//           showsMyLocationButton={true}
//           initialRegion={
//             location
//               ? {
//                   longitude: location[0],
//                   latitude: location[1],
//                   longitudeDelta: LONGITUDE_DELTA,
//                   latitudeDelta: LATITUDE_DELTA,
//                 }
//               : null
//           }
//           style={{ height: "100%", width: "100%" }}
//           provider={PROVIDER_GOOGLE}
//         />
//       </View>

//       <View
//         style={{
//           height: 120,
//         }}
//       >
//         <Text>
//           {websocketConnectionStatus
//             ? " connected to websocket server"
//             : " websocket not connected."}
//         </Text>
//         <Text>{connectionError}</Text>

//         <View style={{ alignItems: "center" }}>
//           {onlineStatus === OnlineStatus.PENDING && (
//             <Text style={styles.statusPending}>Updating Status</Text>
//           )}
//           {onlineStatus === OnlineStatus.OFFLINE && (
//             <Text style={styles.statusOffline}>You are offline</Text>
//           )}
//           {onlineStatus === OnlineStatus.ONLINE && (
//             <Text style={styles.statusOnline}>You are online</Text>
//           )}

//           <TouchableOpacity
//             onPress={toggleStatus}
//             style={{
//               margin: 10,
//               flexDirection: "row",
//               alignItems: "center",
//               backgroundColor: Colors.lightGray3,
//               padding: Sizes.padding3,
//               borderWidth: 1.25,
//               borderColor: Colors.primary,
//               borderRadius: Sizes.radius,
//             }}
//           >
//             <Text
//               style={{ ...Fonts.h5, width: width / 2, textAlign: "center" }}
//             >
//               {updateStatus ? "Go Offline" : "Go Online"}
//             </Text>
//           </TouchableOpacity>
//           <View style={{ alignItems: "center" }}>
//             {message ? <Text>{message}</Text> : <></>}
//           </View>
//         </View>
//       </View>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   statusPending: {
//     ...Fonts.h5,
//     fontSize: 20,
//     color: "#e04d36",
//   },
//   statusOffline: {
//     ...Fonts.h5,
//     fontSize: 20,
//     color: "#e04d36",
//   },
//   statusOnline: {
//     ...Fonts.h5,
//     fontSize: 20,
//     color: "#11c852",
//   },
// });
