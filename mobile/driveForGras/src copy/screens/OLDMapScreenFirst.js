// simple dispatch testing client

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import socketIO from "socket.io-client";

const OnlineStatus = {
  ONLINE: "online",
  PENDING: "pending",
  OFFLINE: "offline",
  ERROR: "error",
};

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let socket;
createSocket = () => {
  if (socket) {
    return;
  } else {
    socket = socketIO("http://127.0.0.1:6004", {
      autoConnect: true,
      // transports: ["websocket"],
      jsonp: false,
    });
  }
};

const MapScreen = () => {
  const navigation = useNavigation();

  const driverId = "61d3ace76615e07345291ade".toString();
  const driverData = {
    driverId: driverId,
    firstName: "Bob",
    lastName: "Law",
    mobileNumber: "1232343456",
    dialCode: "+1",
    currentLocation: {
      type: "Point",
      coordinates: [-110, 35],
    },
  };
  const [location, setLocation] = useState(null);
  const locationList = [
    location,
    [-122.4083, 37.789],
    [-122.4082, 37.788],
    [-122.4081, 37.787],
  ];
  let locationIndex = 0;

  const [updateStatus, setUpdateStatus] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(OnlineStatus.OFFLINE);
  const [websocketConnectionStatus, setWebsocketConnectionStatus] =
    useState(false);
  const [connectionError, setConnectionError] = useState("");
  const [message, setMessage] = useState("");
  const [respondToOrder, setRespondToOrder] = useState(false);
  const [navigation, setNavigation] = useState(false);

  const [currentOrder, setCurrentOrder] = useState({});

  const toggleStatus = () => {
    setUpdateStatus((status) => !status);
  };

  const acceptDeliveryOrder = () => {
    socket.emit("acceptDeliveryOrder", {
      type: "ACCEPT_ORDER",
      data: { driverId: driverId },
    });
    setRespondToOrder(false);
  };

  const denyDeliveryOrder = () => {
    socket.emit("denyDeliveryOrder");
    setMessage("");
    setCurrentOrder({});
    setRespondToOrder(false);
  };

  const sendLocation = () => {
    console.log("sharing location ", locationIndex);
    socket.emit("locationShare", {
      type: "LOCATION_SHARE",
      data: {
        location: {
          type: "Point",
          coordinates: locationList[locationIndex],
        },
      },
    });
    locationIndex++;
    console.log("location list length: ", locationList.length);
    if (locationIndex > locationList.length) {
      locationIndex = 0;
    }
    console.log("location index after sharing: ", locationIndex);
  };

  const arriveToVendor = () => {
    console.log("arrive to vendor");
    socket.emit("navigate", {
      type: "ARRIVE_TO_VENDOR",
      // update order document
    });
  };
  const pickupProduct = () => {
    console.log("pickup product");
    socket.emit("navigate", {
      type: "PICKUP_PRODUCT",
      // update order document
    });
  };
  const arriveToCustomer = () => {
    console.log("arrive to customer");
    socket.emit("navigate", {
      type: "ARRIVE_TO_CUSTOMER",
      // update order document
    });
  };
  const deliverProduct = () => {
    console.log("deliver product");
    socket.emit("navigate", {
      type: "DELIVER_PRODUCT",
      // update order document
    });
  };
  const completeDelivery = () => {
    console.log("complete delivery");
  };

  useEffect(() => {
    setOnlineStatus(OnlineStatus.PENDING);
    // setConnectionError("");
    fetch("http://127.0.0.1:6001/api/v1/drivers/onlineStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ driverId, updateStatus }),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (data.error) {
            // setConnectionError("An error occured while going online.");
            // setOnlineStatus(OnlineStatus.OFFLINE);
          } else {
            if (updateStatus === true) {
              setOnlineStatus(OnlineStatus.ONLINE);
            } else {
              setOnlineStatus(OnlineStatus.OFFLINE);
            }
          }
        },
        (err) => {
          console.log("ERROR THROWN: ", err);
          setConnectionError(err.message);
        }
      );

    // add code to switch onlineStatus to false for unmount.
    // as well as a handler in the auth service to change status
    // from the server side, for disconnected users.
  }, [updateStatus]);

  useEffect(() => {
    if (onlineStatus === OnlineStatus.ONLINE) {
      console.log("connecting to dispatch server..");
      createSocket();

      socket.on("connection", (message) => {
        console.log(message);
        setWebsocketConnectionStatus(true);
        socket.emit("driverConnect", { driverId });
      });

      socket.on("newOrder", ({ message, order }) => {
        console.log(message);
        setCurrentOrder(order);
        setRespondToOrder(true);
        setMessage(message);
      });

      socket.on("orderAssigned", ({ message }) => {
        console.log(message);
        setMessage(message);
        setNavigation(true);
      });

      socket.on("orderAssignedToAnotherDriver", ({ message }) => {
        setRespondToOrder(false);
        setMessage(message);
        setCurrentOrder({});
      });

      socket.on("getLocation", () => {
        sendLocation();
      });
      socket.on("navigate", ({ type }) => {
        console.log("navigation event: ", type);
      });

      socket.on("message", ({ type, message, data }) => {
        console.log(
          `type: ${type},
          message: ${message},
          data: ${data}`
        );
      });
      socket.on("disconnect", () => {
        console.log("disconnecting from room");
      });
    }
  }, [onlineStatus === OnlineStatus.ONLINE]);

  useEffect(() => {
    if (socket) {
      console.log("disconnecting from dispatch..");
      socket.close();
      console.log("disconnected");
      socket = null;
      setWebsocketConnectionStatus(false);
    }
  }, [onlineStatus === OnlineStatus.OFFLINE]);

  useEffect(async () => {
    // put location coords in the state
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission was denied.");
      return;
    }
    const position = await Location.getCurrentPositionAsync();
    let {
      coords: { longitude, latitude },
    } = position;
    // console.log("long: ", longitude, " lat: ", latitude);
    // setLocation([longitude, latitude]);
    setLocation([-122.408417, 37.79]);
  }, []);

  return (
    <SafeAreaView
      style={{ height: "100%", width: "100%", alignItems: "center" }}
    >
      <Text style={{ fontSize: 20 }}>Driver Test Client</Text>
      <Text>driver id: {driverId}</Text>

      <Text>
        {websocketConnectionStatus
          ? "connected to websocket server"
          : "websocket not connected."}
      </Text>

      <Text>{connectionError}</Text>

      <View style={{ alignItems: "center" }}>
        {onlineStatus === OnlineStatus.PENDING && (
          <Text style={styles.statusPending}>Updating Status</Text>
        )}
        {onlineStatus === OnlineStatus.OFFLINE && (
          <Text style={styles.statusOffline}>You are offline</Text>
        )}
        {onlineStatus === OnlineStatus.ONLINE && (
          <Text style={styles.statusOnline}>You are online</Text>
        )}

        <TouchableOpacity
          onPress={toggleStatus}
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {updateStatus ? "Go Offline" : "Go Online"}
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          {message ? <Text>{message}</Text> : <></>}

          <View style={{ flex: 1, width }}>
            <MapView
              showsUserLocation
              showsMyLocationButton={true}
              initialRegion={
                location
                  ? {
                      longitude: location[0],
                      latitude: location[1],
                      longitudeDelta: LONGITUDE_DELTA,
                      latitudeDelta: LATITUDE_DELTA,
                    }
                  : null
              }
              style={{ height: "100%", width: "100%" }}
              provider={PROVIDER_GOOGLE}
            />
          </View>

          {respondToOrder ? (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{`Delivery for ${currentOrder.vendor.vendorName}`}</Text>
              <Text>{`${currentOrder.vendor.street}, ${currentOrder.vendor.city}, ${currentOrder.vendor.state}`}</Text>
              <Text>48 mi away 70 mi trip</Text>
              <Text>Will you accept the order?</Text>
              <View
                style={{
                  width: 150,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={acceptDeliveryOrder}>
                  <Text style={{ fontSize: 24 }}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={denyDeliveryOrder}>
                  <Text style={{ fontSize: 24 }}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <></>
          )}
          {navigation && currentOrder && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text>{`${currentOrder.vendor.vendorName}`}</Text>
              <Text>{`${currentOrder.vendor.street}, ${currentOrder.vendor.city}, ${currentOrder.vendor.state}`}</Text>

              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: 50,
                    height: 80,
                    margin: 5,
                  }}
                  onPress={sendLocation}
                >
                  <Text>share location</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: 50,
                    height: 80,
                    margin: 5,
                  }}
                  onPress={arriveToVendor}
                >
                  <Text>arrive to vendor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: 50,
                    height: 80,
                    margin: 5,
                  }}
                  onPress={pickupProduct}
                >
                  <Text>I've picked up the product</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: 50,
                    height: 80,
                    margin: 5,
                  }}
                  onPress={arriveToCustomer}
                >
                  <Text>arrived at the customer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: 50,
                    height: 80,
                    margin: 5,
                  }}
                  onPress={deliverProduct}
                >
                  <Text>deliver the goods</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: 50,
                    height: 80,
                    margin: 5,
                  }}
                  onPress={completeDelivery}
                >
                  <Text>complete delivery</Text>
                </TouchableOpacity>

                {/* const arriveToCustomer = () => {};
  const deliverProduct = () => {};
  const completeDelivery = () => {}; */}
              </View>
            </View>
          )}
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusPending: {
    fontSize: 20,
    color: "#e04d36",
  },
  statusOffline: {
    fontSize: 20,
    color: "#e04d36",
  },
  statusOnline: {
    fontSize: 20,
    color: "#11c852",
  },
});
