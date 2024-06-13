import React, { type SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { styles } from '../styleClassNames';
import FlexBox from './FlexBox';
import { Paragraph } from './Typography';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	multiple?: React.SelectHTMLAttributes<HTMLSelectElement>['multiple'];
	defaultValue?: string | number;
	values: string[] | number[];
	containerClassName?: string | string[];
	setOption: any; // Dispatch<SetStateAction<string | number>>;
	label?: string;
	labelColor?: any;
}
export default function Select({
	multiple = false,
	values,
	defaultValue = values[0],
	containerClassName,
	className,
	setOption,
	label,
	labelColor = 'text-dark',
	name,
}: SelectProps) {
	return (
		<FlexBox className={twMerge(containerClassName)}>
			{label && (
				<FlexBox className="items-start w-full flex-row">
					<label className={twMerge(labelColor, styles.label_f())}>
						<Paragraph>{label}</Paragraph>
					</label>
				</FlexBox>
			)}
			<select
				name={name}
				className={twMerge(
					'border',
					'wh-10 w-full',
					'text-lg',
					'rounded-btn',
					'bg-light',
					'shadow-inner',
					'input-md',
					'focus:shadow-md',
					className
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
