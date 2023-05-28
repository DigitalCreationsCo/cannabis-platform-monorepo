import { selectUserState, userActions } from "@cd/core-lib/src/reduxDir/features/user.reducer";
import { AnyAction } from "@reduxjs/toolkit";
import React from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, FlexBox, H3, Paragraph, Screen } from '../components';

function UserSettingScreen() {

  const 
  dispatch = useDispatch();
  
  const 
  { user } = useSelector(selectUserState);

  function signOut () {
    dispatch(userActions.signOutUserAsync() as unknown as AnyAction)
  }

  return (
    <ScrollView>
      <FlexBox className="h-full">
      <H3>
        {user.firstName || 'Your Account'}</H3>

        {/* <Text>{`driverId: ${user.id}`}</Text> */}
        {/* <Text>{`${user.firstName} ${user.lastName}`}</Text> */}
      </FlexBox>

      <Button onPress={signOut}>
        <Paragraph>logout</Paragraph>
      </Button>

    </ScrollView>
  )
}

export default Screen(UserSettingScreen)