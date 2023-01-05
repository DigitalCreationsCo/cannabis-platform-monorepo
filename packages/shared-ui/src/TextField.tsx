import { FlexBox } from ".";
import { type } from "os";
import React, { ReactEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    maxNumber?: number;
    name?: string;
    type?: string;
    label?: string;
    value?: string | number;
    placeholder?: string;
    defaultValue?: string | number;
    onChange: ReactEventHandler;
    error?: boolean;
}
function TextField({ className, maxNumber, name, type, error, value, label, placeholder, defaultValue, onChange, ...props }: TextFieldProps) {
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = { ...props }
    return (
        <FlexBox className="w-full">
            { label && <FlexBox className="min-w-[111px] items-start">
                <label>
                { label }
                </label>
            </FlexBox> }
            <input
                name={ name }
                maxLength={ maxNumber }
                defaultValue={ defaultValue }
                type={ type }
                value={ value }
                onChange={ onChange }
                placeholder={ placeholder }
                className={ twMerge(
                    'items-center',
                    'p-4 mx-4 rounded-btn',
                    'wh-10',
                    "outline-none w-full",
                    "shadow-inner",
                    'input-md',
                    error && 'input-error',
                    className
                ) }
                { ...inputProps }
            />
        </FlexBox>
    );
}

export default TextField;