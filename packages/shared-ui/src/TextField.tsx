import { FlexBox } from ".";
import { type } from "os";
import React, { ReactEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type TextFieldProps = {
    className?: string;
    type?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    defaultValue?: string | number;
    onChange: ReactEventHandler;
}
function TextField({ className, type, value, label, placeholder, defaultValue, onChange }: TextFieldProps) {
    return (
        <FlexBox>
            { label && <FlexBox><label>{ label }</label></FlexBox> }
            <input defaultValue={ defaultValue } type={ type } value={ value } onChange={ onChange } placeholder={ placeholder } className={twMerge(
                'items-center',
                'p-4 mx-4 rounded-btn',
                'wh-10',
                "outline-none w-full",
                "shadow-inner",
                className
            )} />
        </FlexBox>
    );
}

export default TextField;