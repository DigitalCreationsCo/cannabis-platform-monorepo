import { Footer } from '@cd/ui-lib';
import { NextStudio } from 'next-sanity/studio';
import { type ReactElement, useEffect } from 'react';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export { metadata } from 'next-sanity/studio/metadata';
export { viewport } from 'next-sanity/studio/viewport';

export default function StudioPage() {
  useEffect(() => {
    window.BrevoConversationsSetup = {
      startHidden: true,
    };
  }, []);
  return (
    <div className="h-full w-full">
      <NextStudio config={config} />;
    </div>
  );
}

// StudioPage.getLayoutContext = (): LayoutContextProps => ({
// 	showHeader: false,
// 	showSideNav: false,
// 	showFooter: false,
// 	showTopBar: false,
// });

StudioPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};
