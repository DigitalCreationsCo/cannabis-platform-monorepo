import { TextContent } from '@cd/core-lib';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Button from './button/Button/Button';
import Center from './Center';
import CheckBox from './CheckBox';
import FlexBox from './FlexBox';
import { H3 } from './Typography';

const CheckAge = ({
	redirect = '/browse',
	onContinue,
	isMultiStep = true,
}: {
	onContinue?: () => void;
	redirect?: string;
	isMultiStep?: boolean;
}) => {
	const router = useRouter();
	const [, setCookie] = useCookies(['yesOver21']);

	const [yesOver21, setYesOver21] = useState(false);
	const toggleOver21 = () => setYesOver21(!yesOver21);
	const [showNext, setShowNext] = useState(false);

	const next = () => {
		isMultiStep ? setShowNext(true) : onSubmit();
	};

	const onSubmit = () => {
		if (onContinue) onContinue();
		router.push(redirect);
	};

	// use motion.div for animation
	// const variants = {
	// 	hidden: { opacity: 0 },
	// 	visible: { opacity: 1 },
	// };

	return (
		<AnimatePresence>
			<Center className="w-full">
				<>
					{!showNext && (
						<motion.div
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 50, opacity: 0 }}
						>
							<FlexBox className="p-4 space-y-4">
								<H3>{TextContent.prompt.ARE_YOU_LEGAL}</H3>
								<CheckBox
									className="w-auto m-auto text-lg"
									name={'checkAge'}
									onChange={toggleOver21}
									checked={yesOver21}
									LabelComponent={H3}
									label="Yes, I'm over 21"
								/>

								<Button
									size="lg"
									bg={'secondary-light'}
									hover={'primary-light'}
									disabled={!yesOver21}
									onClick={() => {
										setCookie('yesOver21', 'true');
										next();
									}}
								>
									Continue
								</Button>
							</FlexBox>
						</motion.div>
					)}
					{showNext && (
						<motion.div
							initial={{ x: 50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 50, opacity: 0 }}
						>
							<FlexBox className="p-4 space-y-4">
								<H3>
									{TextContent.prompt["DO_YOU_KNOW_WHAT_YOU'RE_LOOKING_FOR"]}
								</H3>
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
						</motion.div>
					)}
				</>
			</Center>
		</AnimatePresence>
	);
};

export default CheckAge;
