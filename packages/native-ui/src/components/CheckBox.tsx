import { Checkbox } from 'expo-checkbox';
import { View } from 'react-native';
import { Text } from '@themed';
import FlexBox from './FlexBox';

export interface CheckBoxProps {
	LabelComponent?: ({ children }: { children: string }) => JSX.Element;
	helperText?: string;
	label?: string;
	error?: boolean;
	onChange: any;
	type?: string;
	name?: string;
	checked?: boolean;
}

function CheckBox({
	LabelComponent,
	onChange,
	error,
	label,
	checked,
}: CheckBoxProps) {
	return (
		<View onResponderStart={onChange}>
			<Checkbox
				style={{ height: '30px', width: '30px' }}
				onChange={onChange}
				value={checked}
			/>
			<FlexBox>
				{/* <Label>{helperText || label}</Label> */}
				{(LabelComponent && label && (
					<LabelComponent>{label}</LabelComponent>
				)) || <Text>{label}</Text>}
			</FlexBox>
		</View>
	);
}

export default CheckBox;
