"use client"
import React, { useEffect, useState, type SelectHTMLAttributes } from 'react';
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
	const [selectedValue, setSelectedValue] = useState(defaultValue || '');

	useEffect(() => {
		if (defaultValue) {
			setSelectedValue(defaultValue);
		}
	}, [defaultValue]);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setOption(event);
	};

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
					'border border-gray-300',
					'wh-10 w-full',
					'text-lg',
					'rounded-btn',
					'bg-light',
					'shadow-inner',
					'input-md',
					'focus:shadow-md',
					className
				)}
				onChange={handleChange}
				multiple={multiple}
				value={selectedValue}
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
