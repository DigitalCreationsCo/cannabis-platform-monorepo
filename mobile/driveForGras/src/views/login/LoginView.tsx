import TextContent from "@cd/core-lib/src/constants/textContent";
import React, { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
// import { userActions } from "../redux/features/user";
import { toast } from '@backpackapp-io/react-native-toast';
import { sendOTPEmail } from "@cd/core-lib/src/auth/OTP";
import RNstyles from '@cd/core-lib/src/constants/RNstyles';
import Icons from '@cd/native-ui/src/icons';
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button, Center, FlexBox, H1, H5, Paragraph } from '../../components';

function LoginView () {

    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const getLoginCode = async (input:string) => {
      try {
        
        console.log('send otp code to email')
        await sendOTPEmail(input);
        
      }
      catch (error: any) {
        console.log('get login code error: ', error);
        throw new Error(error.message)
      }
    };
  
    const {
        getValues,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const errorMessage = ''
    
    const onSubmit = async (data: any) => {
        try {
            
        await getLoginCode(getValues('email'));
        // dispatch(userActions.clearErrorMessage());
        // dispatch(userActions.loginUser(data));
        
        navigation.navigate('Passcode')

        } catch (error: any) {
            console.info('login error: ', error);
            toast(error.message)
        }
    };
  
    const emailRef = useRef(null);
  
    return (
      <View className='bg-primary h-full'>
          <View>
            <FlexBox className="flex-row items-center">
            <H1 color="light">
              {TextContent.info.COMPANY_NAME}
            </H1>
            <Icons.Flower color="white" />
            </FlexBox>
            <H5 color="light">
              {TextContent.technical.DRIVER_APP} DRIVER APP
            </H5>
          </View>
  
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
                // rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={RNstyles.textfield.input}
                    autoCapitalize={"none"}
                    ref={emailRef}
                    placeholder={""}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
  
            <Text>
              {((errors.email || errors.password) &&
                "Please enter the empty fields") ||
                errorMessage}
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


// const emailValidationSchema = yup.object().shape({
//     emailOrPhone: yup.string()
//     .email('Not a valid email.')
//     .required('Sign in with your email.'),
//   });
  
export default LoginView;
  