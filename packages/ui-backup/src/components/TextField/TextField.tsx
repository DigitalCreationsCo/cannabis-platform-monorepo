"use client"
import React, {
	useState,
	type ReactEventHandler,
	type SVGAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { Paragraph } from '../Typography';
import { styles } from '../../styleClassNames';
import FlexBox from '../FlexBox';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
	containerClassName?: string;
	name?: string;
	label?: any;
	labelColor?: any;
	justifyLabel?: 'left' | 'center' | 'right';
	value?: string | number;
	placeholder?: string;
	defaultValue?: string | number;
	onChange?: ReactEventHandler;
	onBlur?: ReactEventHandler;
	error?: boolean;
	helperText?: string | false | string[] | any;
	insertIcon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | any;
	onClickIcon?: any;
	inputRef?: any;
};
function TextField({
	className,
	containerClassName,
	name,
	type,
	error,
	value,
	label,
	labelColor = 'text-inherit',
	justifyLabel,
	placeholder,
	defaultValue,
	onChange,
	onBlur,
	helperText = false,
	insertIcon,
	onClickIcon,
	inputRef,
	...props
}: TextFieldProps) {
	const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
		...props,
	};
	const [focus, setFocus] = useState(false);
	function checkMaxValue(event: any) {
		if (props.maxLength && event.target.value.length > props.maxLength) {
			event.target.value = event.target.value.slice(0, props.maxLength);
		}
		if (onChange) onChange(event);
	}

	return (
		<FlexBox
			className={twMerge(
				'space-x-0 space-y-0 w-full',
				'text-inherit',
				containerClassName
			)}
		>
			{label && (
				<FlexBox className="items-start w-full">
					<label className={twMerge(styles.label_f(justifyLabel))}>
						<Paragraph
							className={twMerge(
								labelColor,
								'flex',
								'justify-between',
								'whitespace-wrap',
								'w-full'
							)}
						>
							{label}
						</Paragraph>
					</label>
				</FlexBox>
			)}
			<label
				className={twMerge(
					'input',
					'input-md',
					'!outline-blue-600',
					'grow w-full flex flex-row items-center',
					'px-3 p-2',
					'text-lg',
					'text-dark',
					'shadow-inner',
					focus && 'shadow-md',
					(error && 'placeholder:text-error input-error') ||
						'border border-gray-300',
					'transition'
				)}
			>
				{insertIcon ?? null}
				<input
					aria-label={label || name}
					ref={inputRef}
					onFocus={() => {
						if (onfocus) onfocus;
						setFocus(true);
					}}
					name={name}
					defaultValue={defaultValue}
					type={type}
					value={value}
					onChange={checkMaxValue}
					onBlur={(e) => {
						if (onBlur) onBlur(e);
						setFocus(false);
					}}
					placeholder={helperText || placeholder}
					className={twMerge('grow', className)}
					{...inputProps}
				/>
			</label>
		</FlexBox>
	);
}

export default TextField;

// WIP code for input with icon
// import React, {
// 	useState,
// 	type ReactEventHandler,
// 	type SVGAttributes,
// } from 'react';
// import { twMerge } from 'tailwind-merge';
// import { Paragraph } from '../../components/Typography';
// import { styles } from '../../styleClassNames';
// import IconButton from '../button/IconButton';
// import FlexBox from '../FlexBox';

// export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
// 	className?: string;
// 	containerClassName?: string;
// 	name?: string;
// 	label?: any;
// 	labelColor?: any;
// 	justifyLabel?: 'left' | 'center' | 'right';
// 	value?: string | number;
// 	placeholder?: string;
// 	defaultValue?: string | number;
// 	onChange?: ReactEventHandler;
// 	onBlur?: ReactEventHandler;
// 	error?: boolean;
// 	helperText?: string | false | string[] | any;
// 	insertIcon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | any;
// 	onClickIcon?: any;
// 	inputRef?: any;
// };
// function TextField({
// 	className,
// 	containerClassName,
// 	name,
// 	type,
// 	error,
// 	value,
// 	label,
// 	labelColor = 'text-inherit',
// 	justifyLabel,
// 	placeholder,
// 	defaultValue,
// 	onChange,
// 	onBlur,
// 	helperText = false,
// 	insertIcon,
// 	onClickIcon,
// 	inputRef,
// 	...props
// }: TextFieldProps) {
// 	const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
// 		...props,
// 	};
// 	const [focus, setFocus] = useState(false);
// 	function checkMaxValue(event: any) {
// 		if (props.maxLength && event.target.value.length > props.maxLength) {
// 			event.target.value = event.target.value.slice(0, props.maxLength);
// 		}
// 		if (onChange) onChange(event);
// 	}

// 	return (
// 		<div
// 			className={twMerge(
// 				// 'form-control',
// 				// 'input input-md',
// 				'input',
// 				'text-inherit',
// 				containerClassName
// 			)}
// 		>
// 			{label && (
// 				<div
// 					className={twMerge(
// 						'label'
// 						// 'items-start w-full',
// 						// styles.label_f(justifyLabel)
// 					)}
// 				>
// 					<Paragraph
// 						className={twMerge('label-text', labelColor, 'whitespace-wrap')}
// 					>
// 						{label}
// 					</Paragraph>
// 				</div>
// 			)}
// 			{/* <label
// 				className={twMerge(
// 					'input',
// 					'input-md',
// 					'flex',
// 					'items-center border'
// 					// 'space-x-0 space-y-0 w-full border',
// 				)}
// 			> */}
// 			{/* <FlexBox className="grow w-full flex-row items-center border"> */}
// 			{insertIcon ?? null}
// 			<input
// 				aria-label={label || name}
// 				ref={inputRef}
// 				onFocus={() => {
// 					if (onfocus) onfocus;
// 					setFocus(true);
// 				}}
// 				name={name}
// 				defaultValue={defaultValue}
// 				type={type}
// 				value={value}
// 				onChange={checkMaxValue}
// 				onBlur={() => {
// 					if (onBlur) onBlur;
// 					setFocus(false);
// 				}}
// 				placeholder={helperText || placeholder}
// 				className={twMerge(
// 					'grow',
// 					// 'input',
// 					// 'input-md',
// 					// 'wh-10 w-full',
// 					// 'px-4 py-2 rounded',
// 					// 'text-dark',
// 					// 'text-lg',
// 					// 'shadow-inner',
// 					// focus && 'shadow-md',
// 					// (error && 'placeholder:text-error input-error') ||
// 					// 	'border border-gray-300',
// 					// 'transition',
// 					className
// 				)}
// 				{...inputProps}
// 			/>
// 			{/* </FlexBox> */}
// 			{/* </label> */}
// 		</div>
// 	);
// }

// export default TextField;
