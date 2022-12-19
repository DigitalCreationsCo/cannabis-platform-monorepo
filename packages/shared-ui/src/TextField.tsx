import React, { ReactEventHandler } from "react";

type TextFieldProps = {
    placeholder?: string;
    onChange: ReactEventHandler;
}
function TextField({ placeholder, onChange }: TextFieldProps) {
    return (
        <input onChange={ onChange } placeholder={ placeholder }  className="w-full mb-2" />
    );
}

export default TextField;