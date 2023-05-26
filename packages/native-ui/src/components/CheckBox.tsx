import Checkbox from 'expo-checkbox';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';
import { Paragraph } from './Typography';

export interface CheckBoxProps {
    LabelComponent?: ({children}: {children: string}) => JSX.Element;
    className?: string;
    helperText?: string;
    label?: string;
    error?: boolean;
    onChange: any;
    type?: string;
    name?: string;
    checked?: boolean;
}

function CheckBox({ LabelComponent, onChange, error, label, className, name, checked, helperText }: CheckBoxProps) {

    const styles = {
        checkboxContainer: 'flex flex-row items-center space-x-2 py-8 md:py-2 m-auto self-center md:self-start cursor-pointer',
        helperText: error && 'input-error border-2',
    };
    return (
        <View onResponderStart={onChange as unknown as (GestureResponderEvent) => void} className={twMerge(styles.checkboxContainer, className)}>
            <Checkbox
                className='cursor-pointer'
                style={{ height: '30px', width: '30px' }}
                onChange={onChange}
                value={checked}
            />
            <FlexBox className={twMerge('flex-col', styles.helperText)}>
                {/* <Label>{helperText || label}</Label> */}
                {LabelComponent && label && <LabelComponent>{label}</LabelComponent> || <Paragraph>{label}</Paragraph>}
            </FlexBox>
        </View>
    );
}

export default CheckBox;
