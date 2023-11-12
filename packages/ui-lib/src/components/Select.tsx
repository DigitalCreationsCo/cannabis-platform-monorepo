import React from 'react';
import { twMerge } from 'tailwind-merge';
import { styles } from '../styleClassNames';
import FlexBox from './FlexBox';
import { Small } from './Typography';

type SelectProps = {
	multiple?: React.SelectHTMLAttributes<HTMLSelectElement>['multiple'];
	defaultValue?: string | number;
	values: string[] | number[];
	containerClassName?: string | string[];
	className?: string | string[];
	setOption: any; // Dispatch<SetStateAction<string | number>>;
	label?: string;
};
export default function Select({
	multiple = false,
	values,
	defaultValue = values[0],
	containerClassName,
	className,
	setOption,
	label,
}: SelectProps) {
	return (
		<FlexBox className={twMerge('w-full', containerClassName)}>
			{label && (
				<FlexBox className="items-start w-full flex-row">
					<label className={twMerge(styles.label_f())}>
						<Small className="text-primary">{label}</Small>
					</label>
				</FlexBox>
			)}
			<select
				className={twMerge(
					'border',
					'wh-10 w-full',
					'text-lg',
					'rounded-btn',
					'bg-light',
					'shadow-inner',
					'input-md',
					'focus:shadow-md',
					className,
				)}
				onChange={setOption}
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
		</FlexBox>
	);
}
