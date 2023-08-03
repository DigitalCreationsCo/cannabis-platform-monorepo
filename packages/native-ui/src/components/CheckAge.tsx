import { useState } from 'react';
import Center from './atomic/Center';
import Button from './button/Button';
import CheckBox from './CheckBox';
import FlexBox from './FlexBox';
import { H1, H3 } from './Typography';

const CheckAge = ({
	redirect,
	onContinue,
}: {
	onContinue: () => void;
	redirect?: string;
}) => {
	const [yesOver21, setYesOver21] = useState(false);
	const toggleOver21 = () => setYesOver21(!yesOver21);

	const onSubmit = () => {
		if (onContinue) onContinue();
		// router.push({ pathname: redirect }) // navigates back to the previous page, or the home page if there is no redirect URL
	};

	return (
		<Center>
			<H1>Welcome to Gras</H1>
			<H3>first thing first, are you 21 years or older?</H3>

			<FlexBox className="p-4 space-y-4">
				<CheckBox
					onChange={toggleOver21}
					checked={yesOver21}
					LabelComponent={H3}
					label="I'm over 21"
				/>

				<Button size="lg" disabled={!yesOver21} onPress={onSubmit}>
					Continue
				</Button>
			</FlexBox>
		</Center>
	);
};

export default CheckAge;
