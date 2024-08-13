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
			'flex flex-row space-x-4 md:self-start w-full items-center',
		helperText: error && 'input-error border-2',
	};

	return (
		<FlexBox
			className={twMerge('flex-col w-full py-8 gap-y-2', styles.helperText)}
		>
			{helperText && <LabelComponent>{helperText}</LabelComponent>}
			<div className={twMerge(styles.checkboxContainer, className)}>
				<input
					className="cursor-pointer bg-primary accent-primary-light"
					style={{ minHeight: '30px', minWidth: '30px' }}
					type="checkbox"
					id={name}
					// if the componenet breaks, remove name prop
					name={name}
					onChange={onChange}
					{...inputProps}
				/>
				{label && (
					<Label className="cursor-pointer w-full" htmlFor={name}>
						<LabelComponent>{label}</LabelComponent>
					</Label>
				)}
			</div>
		</FlexBox>
	);
}

export default CheckBox;
