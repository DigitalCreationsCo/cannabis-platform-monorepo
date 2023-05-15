import { MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';
import { Paragraph } from './Typography';

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    LabelComponent?: ({children}: {children: string}) => JSX.Element;
    className?: string;
    helperText?: string;
    label?: string;
    error?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function CheckBox({ LabelComponent, onChange, error, label, className, name, checked, helperText }: CheckBoxProps) {

    const styles = {
        checkboxContainer: 'flex flex-row items-center space-x-2 py-8 md:py-2 m-auto self-center md:self-start cursor-pointer',
        helperText: error && 'input-error border-2',
    };
    return (
        <div onClick={onChange as unknown as MouseEventHandler<HTMLDivElement>} className={twMerge(styles.checkboxContainer, className)}>
            <input
                className='cursor-pointer'
                style={{ height: '30px', width: '30px' }}
                type="checkbox"
                name={name}
                onChange={onChange}
                checked={checked}
            />
            <FlexBox className={twMerge('flex-col', styles.helperText)}>
                {/* <Label>{helperText || label}</Label> */}
                {LabelComponent && label && <LabelComponent>{label}</LabelComponent> || <Paragraph>{label}</Paragraph>}
            </FlexBox>
        </div>
    );
}

export default CheckBox;
