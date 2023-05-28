import TextContent from "@cd/core-lib/src/constants/textContent";
import React, { useRef } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
// import { userActions } from "../redux/features/user";
import { handleOTPInput } from "@cd/core-lib/src/auth/OTP";
import RNstyles from '@cd/core-lib/src/constants/RNstyles';
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as yup from 'yup';
import { Button, Center, H5 } from '../../components';
// import { Images, Fonts, Colors, Sizes, Shadow, Icons } from "../constants";

const PasscodeView = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOTPCode = async (input:string) => {
    try {

      const response  = await handleOTPInput(input);
      
      console.log('otp response: ', response);
      if (response?.user) {
          console.log('got user: ', response.user)
          
          // dispatch(userActions.signinUserSync(response.user));

                // dispatch(userActions.clearErrorMessage());
      // dispatch(userActions.loginUser(data));
      }
      
    }
    catch (error: any) {
      console.log('get login code error: ', error);
      throw new Error(error.message)
    }
  }

    const {
        getValues,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm();

  const errorMessage = ''

      const onSubmit = async (data: any) => {
        await handleOTPCode(getValues('passcode'));
    };
    
  
  const passcodeRef = useRef(null);
  
  return (
    <View className="bg-primary h-full">
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <H5 color="light">go back</H5>
      </TouchableWithoutFeedback>
      
      <Center className="w-[300px] m-auto">
            <H5 color='light'>{TextContent.prompt.ENTER_PASSCODE}</H5>
          <View className={twMerge(RNstyles.textfield.inputContainer)}
            onStartShouldSetResponder={() => passcodeRef.current.focus()}
            >
            <Text>passcode</Text>
            <Controller
              name={"passcode"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                className={RNstyles.textfield.input}
                autoCapitalize={"none"}
                  ref={passcodeRef}
                  placeholder={""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          
          <Text>
            {((errors.passcode) &&
              "Please enter the empty fields") ||
              errorMessage}
          </Text>

          <Button
          className="bg-accent-soft rounded"
          loading={false}
          hover="primary"
          onPress={async() => {
            handleSubmit(onSubmit);
            }}
            >
              <H5 color="light">
                {TextContent.ui.CONTINUE}
              </H5>
          </Button>



          {/* V NOT NEEDED, USING ONE TIME PASSCODE SIGNIN FOR NOW */}
          {/* <Text>
            Don't have account?
          </Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Text>
              Sign up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          >
            <Text>
              Forgot your password?
            </Text>
          </TouchableOpacity> */}

        </Center>
    </View>
  )
}

const passcodeValidationSchema = yup.object().shape({
    passcode: yup.string()
    .required('Invalid passcode.')
  });
  

export default PasscodeView;