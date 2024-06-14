import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';
import Label from './Label';
import { Paragraph } from './Typography';

export interface CheckBoxProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	LabelComponent?: (props: any) => JSX.Element;
	label?: string;
	helperText?: string | false;
	error?: boolean;
}

function CheckBox({
	name,
	onChange,
	LabelComponent = Paragraph,
	error,
	label,
	className,
	helperText,
	...inputProps
}: CheckBoxProps) {
	const styles = {
		checkboxContainer:
			'flex flex-row space-x-4 py-8 md:py-4 md:self-start w-full',
		helperText: error && 'input-error border-2',
	};

	return (
		<div className={twMerge(styles.checkboxContainer, className)}>
			<input
				className="cursor-pointer text-lg bg-primary accent-primary-light"
				style={{ minHeight: '30px', minWidth: '30px' }}
				type="checkbox"
				id={name}
				// if the componenet breaks, remove name prop
				name={name}
				onChange={onChange}
				{...inputProps}
			/>
			<FlexBox className={twMerge('flex-col w-full', styles.helperText)}>
				{helperText && <LabelComponent>{helperText}</LabelComponent>}
				{label && (
					<LabelComponent>
						<Label className="cursor-pointer w-full text-lg" htmlFor={name}>
							{label}
						</Label>
					</LabelComponent>
				)}
			</FlexBox>
		</div>
	);
}

export default CheckBox;
