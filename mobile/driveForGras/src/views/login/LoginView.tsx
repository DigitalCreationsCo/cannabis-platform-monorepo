import TextContent from "@cd/core-lib/src/constants/textContent";
import React, { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
// import { userActions } from "../redux/features/user";
import { toast } from '@backpackapp-io/react-native-toast';
import { sendOTPEmailRaw } from "@cd/core-lib/src/auth/OTP";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import SuperTokens from 'supertokens-react-native';
import { twMerge } from "tailwind-merge";
import * as yup from 'yup';
import { Button, Center, H5, Paragraph } from '../../components';
import RNstyles from '../../styles/classes';
SuperTokens.addAxiosInterceptors(axios);

function LoginView () {

    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const emailRef = useRef(null);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({ mode: "onSubmit", resolver: yupResolver(emailValidationSchema) });
  
    const onSubmit = async (data: any) => {
      try {

          await 
          sendOTPEmailRaw(data.email);
          
          navigation.navigate('Passcode');

          toast(TextContent.prompt.PASSCODE_SENT_f(data.email));
          
          reset();

      } catch (error: any) {
          console.info('login error: ', error);
          toast(error.message)
      }
    };
  
    return (
      <View className='bg-primary h-full'>
        
          {/* <FastImage source={{ uri: "../../public/images/weed.gif" }} className='border h-24 w-24' /> */}
          <Center className="w-[300px] m-auto">
            
            <H5 color='light'>
                Sign In with your email</H5>

            <View className={twMerge(RNstyles.textfield.inputContainer)}
              onStartShouldSetResponder={() => emailRef.current.focus()}
              >
              <Paragraph>email</Paragraph>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={RNstyles.textfield.input}
                    autoCapitalize="none"
                    ref={emailRef}
                    placeholder={""}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
  
            <Text className={RNstyles.textfield.message}>
              {errors.email && errors.email?.message.toString()}
            </Text>
  
            <Button
            className="bg-accent-soft rounded"
            loading={false}
            hover="primary"
            onPress={handleSubmit(onSubmit)}
            >
              <H5 color="light">
                {TextContent.ui.SIGNIN}
              </H5>
            </Button>
            
          </Center>
      </View>
    );
  }


const emailValidationSchema = yup.object().shape({
    email: yup.string()
    .required('Please enter your email')
    .email('Please enter your email'),
  });
  
export default LoginView;
  