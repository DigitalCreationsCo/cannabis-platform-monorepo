import { LayoutContextProps, Page } from '@cd/ui-lib';
import { Widget } from '@typeform/embed-react';
import { useState } from 'react';
import Confetti from "react-confetti";

function SurveyPage() {
    
  const [showConfetti, setShowConfetti] = useState(false);
  
  const surveys = {
    'green-survey': 'NQO1838X',
    'test-embed': 'xdfP8Tia'
  }
  return (
      <Page className="!p-0 m-0 sm:!p-0 md:!p-0 lg:!p-0">
          <Widget id={ surveys['green-survey'] } 
          inlineOnMobile
          autoFocus
          hideHeaders
          hideFooter
          source='grascannabis.org'
          onSubmit={() => setShowConfetti(true)}
          className="my-form w-full h-[600px] rounded-none p-2" />
          { showConfetti && <Confetti /> }
      </Page>
  );
}

SurveyPage.getLayoutContext = (): LayoutContextProps => ({
  showHeader: false,
  showSideNav: false
});

export default SurveyPage;
