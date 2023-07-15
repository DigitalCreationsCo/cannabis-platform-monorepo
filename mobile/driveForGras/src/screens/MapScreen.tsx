import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions, Text, View
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { BannerButton, Greeting, Paragraph } from "../components";
// import { useLocationWatch } from "../hooks";
import { DriveScreens } from "../navigation/paths";
// import { moduleActions } from "../redux/features/module";
// import { socketActions } from "../redux/features/socket";
// import { userActions } from "../redux/features/user";
import useAfterMount from '@cd/core-lib/src/hooks/useAfterMount';
import { driverActions, selectDriverState } from "@cd/core-lib/src/reduxDir/features/driver.reducer";
import { selectSocketState, socketActions } from "@cd/core-lib/src/reduxDir/features/socket.reducer";
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
  { connectionOpenInit, isConnected, errorMessage, incomingOrder } = useSelector(selectSocketState);
  
  // useLocationWatch();
  // const location = useSelector(Selector.currentCoordinates);

  const [updateStatus, setUpdateStatusStatus] = useState(false);
  
  function toggleStatus () { 
    setUpdateStatusStatus(!updateStatus); 
  }

  useEffect(() => {

    // HANDLE updateStatus changes on component mount
    
  }, []);
  
  useEffect(() => {

    // HANDLE updateStatus chamges when the button is clicked
    console.info('updateStatus: ', updateStatus)
    dispatch(driverActions.updateOnlineStatus(updateStatus))
    
    // this line triggers the socket connection attempt when the user clicks the go online button.
    // the button changes the state value 'updateStatus'
      // if (isOnline === true && updateStatus === isOnline){
      //   // do nothing
      //   console.info('call updateOnlineStatus 1')
      // dispatch(driverActions.updateOnlineStatus(updateStatus))
      // .catch((error) => {
      //   toast.error(error.message);
      //   toggleStatus();
      // });}

      // else if (isOnline === true && updateStatus !== isOnline){
      //   // change state
      //   console.info('call updateOnlineStatus 2 ')
      // }

      // else if (isOnline === false && updateStatus !== isOnline){
      //   // dispatch updateStatus
      //   console.info('call updateOnlineStatus 3 ')

      // }
  }, [updateStatus]);

  useAfterMount(() => {

    console.info('useAfterMount: MapScreen')
    isOnline
      ? dispatch(socketActions.openConnection())
      : dispatch(socketActions.closingConnection());
  }, [isOnline]);
      
  const
  isGoingOnline = updateStatus || !isConnected && connectionOpenInit,
  
  showOnlineStatus = 
    isGoingOnline ? "Going Online..." : 
    isConnected ? "Looking for deliveries..." : "Go Online";

    useEffect(() => {
      if (!isEmpty(incomingOrder?.newOrder)) {
        navigation.navigate(DriveScreens.NEW_ORDER_SCREEN);
      }
    }, [incomingOrder]);
    
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
        <View className="absolute top-0 right-0 z-10 p-1"><Paragraph className="font-bold text-inverse">Gras</Paragraph></View>
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

function isEmpty(object: any) {
  if (object === undefined)
  return true;
  
  if (object === null)
  return true;

  if (Object.keys(object).length === 0)
  return true;

  return false;
}