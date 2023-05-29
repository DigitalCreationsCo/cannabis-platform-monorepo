import { toast } from '@backpackapp-io/react-native-toast';
import { PasswordlessResponseWithDriverDetails } from '@cd/core-lib/src/auth/authTypes';
import TextContent from "@cd/core-lib/src/constants/textContent";
import { driverActions } from '@cd/core-lib/src/reduxDir/features/driver.reducer';
import { userActions } from '@cd/core-lib/src/reduxDir/features/user.reducer';
// import { userActions } from '@cd/core-lib/src/reduxDir/features/user.reducer';
import { urlBuilder } from "@cd/core-lib/src/utils/urlBuilder";
import { DriverWithDetails, UserWithDetails } from '@cd/data-access';
// import { UserWithDetails } from '@cd/data-access';
import Icons from "@cd/native-ui/src/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import SuperTokens from 'supertokens-react-native';
import { twMerge } from "tailwind-merge";
import * as yup from 'yup';
import { Button, Center, H5, Paragraph } from '../../components';
import RNstyles from '../../styles/classes';
SuperTokens.addAxiosInterceptors(axios);

const PasscodeView = ({ route }) => {

  const { deviceId, preAuthSessionId } = route.params;
  
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const passcodeRef = useRef(null);

  const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({ mode: "onSubmit", resolver: yupResolver(passcodeValidationSchema) });

  const onSubmit = async (data: any) => {
    try {

      let 
      response = await axios.post<PasswordlessResponseWithDriverDetails>(urlBuilder.main.submitOTP(), { 
        userInputCode: data.passcode,
        preAuthSessionId: preAuthSessionId,
        deviceId: deviceId,
        appUser: 'DRIVER',
        },
        { headers: {
          'Content-Type': 'application/json',
          'rid': 'passwordless',
        }})

      if (!response.data.user)
      throw new Error('An error occured. No user found.');
      
      signIn(response.data.user);

    } catch (error: any) {
      console.info('passcode error: ', error);
      toast(error.message)
    }
  };
    
  function signIn (driver: DriverWithDetails) {
    dispatch(driverActions.signinDriverSync(driver));
    dispatch(userActions.signinUserSync(driver.user as UserWithDetails));
  }
  return (
    <View className="bg-primary h-full">

      <TouchableWithoutFeedback
      onPress={() => navigation.goBack()}
      >
        <Text className='text-md text-light'>
          <Icons.Back />
          {` go back`}</Text>
      </TouchableWithoutFeedback>
      
      <Center className="w-[300px] m-auto">
        
        <H5 color='light'>
          {TextContent.prompt.ENTER_PASSCODE}</H5>
          
        <View className={twMerge(RNstyles.textfield.inputContainer)}
          onStartShouldSetResponder={() => passcodeRef.current.focus()}
          >
          <Paragraph>passcode</Paragraph>
          <Controller
            name={"passcode"}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              className={twMerge(RNstyles.textfield.input, 'self-center')}
                ref={passcodeRef}
                placeholder={""}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        
        <Text className={RNstyles.textfield.message}>
          {errors.passcode && errors.passcode.message.toString()}
        </Text>

        <Button
        className="bg-accent-soft rounded"
        loading={false}
        hover="primary"
        onPress={handleSubmit(onSubmit)}
        >
          <H5 color="light">
            {TextContent.ui.CONTINUE}
          </H5>
        </Button>

      </Center>
    </View>
  )
}

const passcodeValidationSchema = yup.object().shape({
    passcode: yup.string()
    .required('Invalid passcode.')
  });
  

export default PasscodeView;