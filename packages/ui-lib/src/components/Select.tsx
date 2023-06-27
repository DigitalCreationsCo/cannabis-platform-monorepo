import React, { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectProps = {
    multiple?: React.SelectHTMLAttributes<HTMLSelectElement>['multiple'];
    defaultValue: string | number;
    values: string[] | number[];
    className?: string;
    setOption: Dispatch<SetStateAction<string | number>>;
};
export default function Select({ multiple, values, defaultValue = values[0], className, setOption }: SelectProps) {
    return (
        <select
            className={twMerge('select focus:outline-none w-fit border', className)}
            multiple={multiple}
            defaultValue={defaultValue}
        >
            {values?.map((value, index) => (
                <option 
                key={'option-' + index}
                value={value} 
                onClick={() => setOption(value)}
                >
                    {value}
                </option>
            ))}
        </select>
    );
}
