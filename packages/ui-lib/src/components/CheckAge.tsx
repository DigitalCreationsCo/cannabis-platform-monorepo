import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Button from './button/Button';
import Center from './Center';
import CheckBox from './CheckBox';
import FlexBox from './FlexBox';
import { H1, H3 } from './Typography';

const CheckAge = ({
	redirect,
	onContinue,
}: {
	onContinue?: () => void;
	redirect?: string;
}) => {
	const router = useRouter();
	const [, setCookie] = useCookies(['yesOver21']);

	const [yesOver21, setYesOver21] = useState(false);
	const toggleOver21 = () => setYesOver21(!yesOver21);

	const onSubmit = () => {
		setCookie('yesOver21', 'true');
		if (onContinue) onContinue();
		router.push({ pathname: redirect }); // navigates back to the previous page, or the home page if there is no redirect URL
	};

	return (
		<Center>
			<H1>Welcome to Gras</H1>
			<H3>first thing first, are you 21 years or older?</H3>

			<FlexBox className="p-4 space-y-4">
				<CheckBox
					name={'checkAge'}
					onChange={toggleOver21}
					checked={yesOver21}
					LabelComponent={H3}
					label="I'm over 21"
				/>

				<Button size="lg" disabled={!yesOver21} onClick={onSubmit}>
					Continue
				</Button>
			</FlexBox>
		</Center>
	);
};

export default CheckAge;
