import { NextSeo } from "next-seo";
import { seoConfig } from "@/lib/seo.config";
import keywords from '@cd/core-lib/seo'
import RestrictedPage from '@/components/layout/RestrictedPage'
import { useState } from "react";

export default function Browse() {
	const [showContent, setShowContent] = useState(false)
  	return (
    <>
      <NextSeo
		{...seoConfig}
		additionalMetaTags={[
			...(seoConfig.additionalMetaTags || []),
			{
				name: 'keywords',
				content: [
					...keywords['cannabis'],
					...keywords['events'],
					...keywords['delivery'],
				].join(', '),
			},
		]}
		/>
		<RestrictedPage showContent={showContent} setShowRestrictedContent={setShowContent}>
			HELLO
		</RestrictedPage>
      </>
  );
}
