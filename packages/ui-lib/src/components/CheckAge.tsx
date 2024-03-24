import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { TextContent } from '../../../core-lib/src';
import Button from './button/Button/Button';
import Center from './Center';
import CheckBox from './CheckBox';
import FlexBox from './FlexBox';
import { H1, H3 } from './Typography';

const CheckAge = ({
	redirect = '/browse',
	onContinue,
}: {
	onContinue?: () => void;
	redirect?: string;
}) => {
	const router = useRouter();
	const [, setCookie] = useCookies(['yesOver21']);

	const [yesOver21, setYesOver21] = useState(false);
	const toggleOver21 = () => setYesOver21(!yesOver21);
	const [showNext, setShowNext] = useState(false);

	const onSubmit = () => {
		if (onContinue) onContinue();
		router.push({ pathname: redirect }); // navigates back to the previous page, or the browse page if there is no redirect param
	};

	return (
		<Center className="w-full">
			{!showNext ? (
				<FlexBox className="p-4 space-y-4">
					<H3>{TextContent.prompt.ARE_YOU_LEGAL}</H3>
					<CheckBox
						className="w-auto m-auto"
						name={'checkAge'}
						onChange={toggleOver21}
						checked={yesOver21}
						LabelComponent={H3}
						label="I'm over 21"
					/>

					<Button
						size="lg"
						bg={'secondary-light'}
						hover={'primary-light'}
						disabled={!yesOver21}
						onClick={() => {
							setCookie('yesOver21', 'true');
							setShowNext(true);
						}}
					>
						Continue
					</Button>
				</FlexBox>
			) : (
				<FlexBox className="p-4 space-y-4">
					<H3>{TextContent.prompt["DO_YOU_KNOW_WHAT_YOU'RE_LOOKING_FOR"]}</H3>
					<H3>{TextContent.prompt['SEND_YOU_OFFERS']}</H3>

					<Button
						className="w-[300px]"
						size="lg"
						bg={'secondary-light'}
						hover={'primary-light'}
						disabled={!yesOver21}
						onClick={onSubmit}
					>
						I know what I'm looking for
					</Button>

					<Button
						className="w-[300px]"
						size="lg"
						bg={'secondary-light'}
						hover={'primary-light'}
						disabled={!yesOver21}
						onClick={() => router.push('/weed-text')}
					>
						Send me offers
					</Button>
				</FlexBox>
			)}
		</Center>
	);
};

export default CheckAge;
