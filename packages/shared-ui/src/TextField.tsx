import React, { ReactEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    containerClassName?: string;
    maxNumber?: number;
    name?: string;
    type?: string;
    label?: string;
    value?: string | number;
    placeholder?: string;
    defaultValue?: string | number;
    onChange: ReactEventHandler;
    onBlur?: ReactEventHandler;
    error?: boolean;
    helperText?: string;
};
function TextField({
    className,
    containerClassName,
    maxNumber,
    name,
    type,
    error,
    value,
    label,
    placeholder,
    defaultValue,
    onChange,
    onBlur,
    helperText,
    ...props
}: TextFieldProps) {
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = { ...props };
    const [focus, setFocus] = React.useState(false);
    return (
        <FlexBox className={twMerge('w-full', containerClassName)}>
            {label && (
                <FlexBox className="min-w-[111px] items-start">
                    <label>{label}</label>
                </FlexBox>
            )}
            <input
                onFocus={() => {
                    if (onfocus) onfocus;
                    setFocus(true);
                }}
                name={name}
                maxLength={maxNumber}
                defaultValue={defaultValue}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={() => {
                    if (onBlur) onBlur;
                    setFocus(false);
                }}
                placeholder={helperText || placeholder}
                className={twMerge(
                    'items-center',
                    'p-4 mx-4 rounded-btn',
                    'wh-10',
                    'outline-none focus:outline-none w-full',
                    'shadow-inner',
                    'input-md',
                    focus && 'shadow-md',
                    error && 'input-error border-2',
                    className
                )}
                {...inputProps}
            />
        </FlexBox>
    );
}

export default TextField;
