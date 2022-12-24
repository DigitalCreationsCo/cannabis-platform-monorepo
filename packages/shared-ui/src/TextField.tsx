import { type } from "os";
import React, { ReactEventHandler } from "react";

type TextFieldProps = {
    type?: string;
    label?: string;
    value: string;
    placeholder?: string;
    defaultValue?: string | number;
    onChange: ReactEventHandler;
}
function TextField({ type, value, label, placeholder, defaultValue, onChange }: TextFieldProps) {
    return (
        <>
            { label && <label></label> }
            <input defaultValue={defaultValue} type={type} value={value} onChange={ onChange } placeholder={ placeholder }  className="w-full mb-2" />
        </>
    );
}

export default TextField;