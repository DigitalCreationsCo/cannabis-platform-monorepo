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
	LabelComponent = Paragraph,
	error,
	label,
	className,
	helperText,
	...inputProps
}: CheckBoxProps) {
	const styles = {
		checkboxContainer:
			'flex flex-row items-center space-x-2 py-8 md:py-2 m-auto self-center md:self-start cursor-pointer',
		helperText: error && 'input-error border-2',
	};

	return (
		<div className={twMerge(styles.checkboxContainer, className)}>
			<input
				className="cursor-pointer"
				style={{ height: '30px', width: '30px' }}
				type="checkbox"
				id={inputProps.name}
				{...inputProps}
			/>
			<FlexBox className={twMerge('flex-col', styles.helperText)}>
				{helperText && <LabelComponent>{helperText}</LabelComponent>}
				{label && (
					<LabelComponent>
						<Label className="cursor-pointer" htmlFor={inputProps.name}>
							{label}
						</Label>
					</LabelComponent>
				)}
			</FlexBox>
		</div>
	);
}

export default CheckBox;
