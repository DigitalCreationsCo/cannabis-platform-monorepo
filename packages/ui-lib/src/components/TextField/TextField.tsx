import { type CarbonIconType } from '@carbon/icons-react';
import React, {
	useState,
	type ReactEventHandler,
	type SVGAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { Paragraph } from '../../components/Typography';
import { styles } from '../../styleClassNames';
import IconButton from '../button/IconButton';
import FlexBox from '../FlexBox';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
	containerClassName?: string;
	name?: string;
	label?: string;
	labelColor?: any;
	justifyLabel?: 'left' | 'center' | 'right';
	value?: string | number;
	placeholder?: string;
	defaultValue?: string | number;
	onChange: ReactEventHandler;
	onBlur?: ReactEventHandler;
	error?: boolean;
	helperText?: string | false | string[] | any;
	insertIcon?:
		| ((props: SVGAttributes<SVGElement>) => JSX.Element)
		| CarbonIconType;
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
	labelColor = 'text-dark',
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
		// limit value length to props.maxLength
		if (props.maxLength && event.target.value.length > props.maxLength) {
			event.target.value = event.target.value.slice(0, props.maxLength);
		}
		if (onChange) onChange(event);
	}

	return (
		<FlexBox
			className={twMerge(
				'space-x-0 space-y-0 w-full',
				'text-dark',
				containerClassName,
			)}
		>
			{label && (
				<FlexBox className="items-start w-full">
					<label className={twMerge(styles.label_f(justifyLabel))}>
						<Paragraph className={twMerge(labelColor, 'whitespace-wrap')}>
							{label}
						</Paragraph>
					</label>
				</FlexBox>
			)}
			<FlexBox className="grow w-full flex-row items-center">
				{insertIcon && (
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							onClickIcon && onClickIcon(e);
						}}
						className={twMerge(
							'bg-transparent hover:bg-transparent md:hover:bg-transparent focus:bg-transparent shadow-none px-0 pl-2 m-0 h-min w-min place-self-center',
						)}
						Icon={insertIcon}
					/>
				)}
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
					onBlur={() => {
						if (onBlur) onBlur;
						setFocus(false);
					}}
					placeholder={helperText || placeholder}
					className={twMerge(
						'font-onest',
						'text-xl',
						'bg-light',
						'items-center',
						'p-4 rounded-btn',
						'wh-10',
						// 'outline-none focus:outline-none',
						'w-full',
						'shadow-inner',
						'input-md',
						focus && 'shadow-md',
						error && 'input-error border-2',
						'border',
						'transition',
						className,
					)}
					{...inputProps}
				/>
			</FlexBox>
		</FlexBox>
	);
}

export default TextField;
