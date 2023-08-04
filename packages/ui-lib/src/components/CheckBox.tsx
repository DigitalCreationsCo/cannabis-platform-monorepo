import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';
import { Paragraph } from './Typography';

export interface CheckBoxProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	LabelComponent?: ({ children }: { children: string }) => JSX.Element;
	className?: string;
	helperText?: string | false;
	label?: string;
	error?: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function CheckBox({
	LabelComponent,
	onChange,
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
		// <div
		<button
			onClick={onChange as any}
			className={twMerge(styles.checkboxContainer, className)}
		>
			<input
				className="cursor-pointer"
				style={{ height: '30px', width: '30px' }}
				type="checkbox"
				onChange={onChange}
				{...inputProps}
			/>
			<FlexBox className={twMerge('flex-col', styles.helperText)}>
				{/* <Label>{helperText || label}</Label> */}
				{(LabelComponent && label && (
					<LabelComponent>{label}</LabelComponent>
				)) || <Paragraph>{label}</Paragraph>}
			</FlexBox>
		</button>
	);
}

export default CheckBox;
