import { Page, type LayoutContextProps } from '@cd/ui-lib';
import { Widget } from '@typeform/embed-react';
import { useState } from 'react';
import Confetti from 'react-confetti';

function SurveyPage() {
	const [showConfetti, setShowConfetti] = useState(false);

	const surveys = {
		'green-survey': 'NQO1838X',
		'test-embed': 'xdfP8Tia',
	};
	return (
		<Page className="m-0 !p-0 sm:!p-0 md:!p-0 lg:!p-0">
			<Widget
				id={surveys['green-survey']}
				inlineOnMobile
				hideHeaders
				hideFooter
				source="grascannabis.org"
				onSubmit={() => setShowConfetti(true)}
				className="my-form h-[600px] w-full rounded-none p-2"
			/>
			{showConfetti && <Confetti />}
		</Page>
	);
}

SurveyPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default SurveyPage;
