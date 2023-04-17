import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';
import { Paragraph } from './Typography';

export type CheckBoxProps = {
    className?: string;
    helperText?: string;
    label?: string;
    error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function CheckBox({ error, label, className, name, onChange, checked, helperText }: CheckBoxProps) {
    const styles = {
        checkboxContainer: 'flex-row items-center space-x-1 py-8 md:py-2 m-auto self-center md:self-start',
        helperText: error && 'input-error border-2'
    };
    return (
        <FlexBox className={twMerge(styles.checkboxContainer, className)}>
            <input
                style={{ height: '20px', width: '30px' }}
                type="checkbox"
                name={name}
                onChange={onChange}
                checked={checked}
            />
            <FlexBox className={twMerge('flex-col', styles.helperText)}>
                {/* <Label>{helperText || label}</Label> */}
                <Paragraph>{label}</Paragraph>
            </FlexBox>
        </FlexBox>
    );
}

export default CheckBox;
