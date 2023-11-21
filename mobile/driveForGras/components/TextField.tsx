// import { CarbonIconType } from '@carbon/icons-react';
// import { ReactEventHandler, SVGAttributes, useState } from 'react';
// import { Text, TextInput, View } from "react-native";
// // import { useDispatch, useSelector } from "react-redux";
// // import { userActions } from "../redux/features/user";
// import { Controller } from "react-hook-form";
// // import { Images, Fonts, Colors, Sizes, Shadow, Icons } from "../constants";

// type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
//     className?: string;
//     containerClassName?: string;
//     maxNumber?: number;
//     name?: string;
//     type?: string;
//     label?: string;
//     value?: string | number;
//     placeholder?: string;
//     defaultValue?: string | number;
//     onChange: ReactEventHandler;
//     onBlur?: ReactEventHandler;
//     error?: boolean;
//     helperText?: string | false;
//     insertIcon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | CarbonIconType;
//     onClickIcon?: any;
//     inputRef?: any;
//     control: any;
// };
// function TextField({
//     control,
//     className,
//     containerClassName,
//     maxNumber,
//     name,
//     type,
//     error,
//     value,
//     label,
//     placeholder,
//     defaultValue,
//     onChange,
//     onBlur,
//     helperText,
//     insertIcon,
//     onClickIcon,
//     inputRef,
//     ...props
// }: TextFieldProps) {
//     const inputProps: React.InputHTMLAttributes<HTMLInputElement> = { ...props };
//     const [focus, setFocus] = useState(false);
//     const styles = {
//         flexContainer: 'space-x-0 space-y-0 w-full'
//     };
//     return (
//         <View
//             // onStartShouldSetResponder={() => emailRef.current.focus()}

//             >
//             <Text>email</Text>
//             <Controller
//               name={"email"}
//               control={control}
//               rules={{ required: true }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   autoCapitalize={"none"}
//                   ref={emailRef}
//                   placeholder={""}
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                 />
//               )}
//             />
//           </View>
//     );
// }

// export default TextField;

import { View, Text } from '@themed';
const RNTextField = () => {
	return (
		<View>
			<Text>RNTextField</Text>
		</View>
	);
};
export default RNTextField;
