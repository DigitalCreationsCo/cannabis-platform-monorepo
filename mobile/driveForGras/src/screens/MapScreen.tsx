import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions, Text, View
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { BannerButton, Greeting } from "../components";
// import { useLocationWatch } from "../hooks";
import { DriveScreens } from "../navigation/paths";
// import { moduleActions } from "../redux/features/module";
// import { socketActions } from "../redux/features/socket";
// import { userActions } from "../redux/features/user";
import useAfterMount from '@cd/core-lib/src/hooks/useAfterMount';
import { selectDriverState } from "@cd/core-lib/src/reduxDir/features/driver.reducer";
import { selectSocketState } from "@cd/core-lib/src/reduxDir/features/socket.reducer";
import { Screen } from '../components';
import { useAppDispatch } from "../redux/store";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// separate the map functionality from the go online functionality
const MapScreen = () => {
  
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  
  const 
  { driver: { user }} = useSelector(selectDriverState),
  { isOnline } = useSelector(selectDriverState).driver.driverSession,
  { connectionOpenInit, isConnected, errorMessage } = useSelector(selectSocketState);
  
  console.log('isEstablishingConnection', connectionOpenInit);
  // useLocationWatch();
  // const location = useSelector(Selector.currentCoordinates);

  const [updateStatus, setUpdateStatusStatus] = useState(false);
  
  function toggleStatus () { 
    setUpdateStatusStatus(!updateStatus); 
  }
  
  useEffect(() => {
    
      // if (updateStatus !== isOnline)
      // dispatch(driverActions.updateOnlineStatus(updateStatus))
      // .catch((error) => {
      //   toast.error(error.message);
      //   toggleStatus();
      // });
      
  }, [updateStatus]);

  useAfterMount(() => {

    console.log('isOnline changed', isOnline);
    
    // isOnline
    //   ? dispatch(socketActions.openConnection())
    //   : dispatch(socketActions.closeConnection());
  }, [isOnline]);
      
      
  // const { isEstablishingConnection, isConnected, connectionError, message } =
  //   useSelector(Selector.socket);

  const
  isGoingOnline = updateStatus || !isConnected && connectionOpenInit,
  
  showOnlineStatus = 
    isGoingOnline ? "Going Online..." : 
    isConnected ? "Looking for deliveries..." : "Go Online";

    // const { newOrder } = useSelector(Selector.incomingOrder);
    const 
    { newOrder } = { newOrder: null}
    // const { isOnline } = user;
  
    useEffect(() => {
      if (newOrder) {
        navigation.navigate(DriveScreens.NEW_ORDER_SCREEN);
      }
    }, [newOrder]);
    
  {/* {isLoading ? (
            <Text style={styles.statusPending}>Loading..</Text>
          ) : isOnline && isEstablishingConnection && !isConnected ? (
            <Text style={styles.statusOnline}>Going Online..</Text>
          ) : isOnline && isConnected ? (
            <Text style={styles.statusOnline}>You are online</Text>
          ) : (
            <Text style={styles.statusOffline}>You are offline</Text>
          )} */}

  return (
    <>
      <>
        <Text> ({isConnected
            ? ` connected to websocket { web socket id } ` 
            : " websocket no connection "})
        </Text>

        <Text> isOnline: {isOnline.toString()}</Text>
        <Text> connectionOpenInit: {connectionOpenInit ? 'true' : 'false'}</Text>
        <Text> error: {errorMessage || 'null'}</Text>
      </>

      <View className="grow">
        <Greeting isLoading={true} />

        <MapView
        className='grow' 
          showsUserLocation
          followsUserLocation
          showsMyLocationButton={true}
          // region={{
          //   longitude: location[0],
          //   latitude: location[1],
          //   longitudeDelta: LONGITUDE_DELTA,
          //   latitudeDelta: LATITUDE_DELTA,
          // }}
          provider={PROVIDER_GOOGLE}
        />

          <BannerButton
            onPress={toggleStatus}
            disabled={false}
          >
            { showOnlineStatus }
          </BannerButton>

      </View>
      <StatusBar style="inverted" />
    </>
  );
};

export default Screen(MapScreen)