import React from 'react';
import { twMerge } from 'tailwind-merge';

type SelectProps = {
	multiple?: React.SelectHTMLAttributes<HTMLSelectElement>['multiple'];
	defaultValue?: string | number;
	values: string[] | number[];
	className?: string;
	setOption: any; // Dispatch<SetStateAction<string | number>>;
};
export default function Select({
	multiple = false,
	values,
	defaultValue = values[0],
	className,
	setOption,
}: SelectProps) {
	return (
		<select
			className={twMerge('border-2 rounded ml-2', className)}
			onChange={(e) => setOption(e.target.value)}
			// className={twMerge('select focus:outline-none w-fit border', className)}
			multiple={multiple}
			defaultValue={defaultValue}
		>
			{values?.map((value, index) => (
				<option key={'option-' + index} value={value}>
					{value}
				</option>
			))}
		</select>
	);
}
