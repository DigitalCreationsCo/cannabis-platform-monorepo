import {
	Button,
	FlexBox,
	Footer,
	H1,
	H2,
	H3,
	Page,
	Paragraph,
	styles,
} from '@cd/ui-lib';
import TopBar from '@cd/ui-lib/src/components/PlainTopBar';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { type ReactElement, useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import HelpTopBar from '@/components/help-topics/HelpTopBar';
import { helpTopics } from '../components/help-topics';

function HelpCenter() {
	const topicParam = useSearchParams().get('topic') as keyof typeof helpTopics;
	const [topic, setTopic] = useState(topicParam);

	useEffect(() => {
		setTopic(topicParam);
	}, [topicParam]);

	const SelectATopic = () => (
		<div>
			<H3>Select A Topic To Learn More</H3>
		</div>
	);
	const HelpComponent = useCallback(
		helpTopics[topic]?.component || SelectATopic,
		[topic]
	);
	return (
		<>
			<Page className="p-0 m-0 md:p-0 lg:p-0">
				<TopBar className="text-secondary bg-transparent" />
				<div className={twMerge(styles.HERO.container, 'border')}>
					<H1 className="text-primary border">We're here to help.</H1>
					<div className="tabs hidden gap-2 md:block">
						{Object.keys(helpTopics).map((key) => (
							<Link
								href={`?topic=${key}`}
								key={`help-topic-${key}`}
								onClick={() => setTopic(key as keyof typeof helpTopics)}
								className={twMerge([
									'font-semibold',
									topic === key
										? 'tab tab-bordered tab-active'
										: 'tab tab-bordered',
									'hover:bg-gray-100 rounded-btn btn-ghost btn capitalize',
									topic === key ? 'text-primary' : 'text-dark-soft',
								])}
							>
								<Paragraph>{key}</Paragraph>
							</Link>
						))}
					</div>
					<FlexBox className="p-1 md:items-center md:py-8 xl:items-center">
						{topic === 'faq' && (
							<H2 className="text-primary p-1">Frequently Asked Questions</H2>
						)}
						<HelpComponent />
						{topic === 'faq' && (
							<div className="m-auto">
								<Paragraph className="text-center text-xl m-auto">
									Have more questions?
								</Paragraph>
								<Button
									bg="transparent"
									hover="transparent"
									onClick={() => {
										window?.BrevoConversations?.openChat();
									}}
									className="hover:text-primary duration-0 mx-auto text-xl font-semibold underline"
								>
									<H3 className="text-center m-auto">We're available.</H3>
								</Button>
							</div>
						)}
					</FlexBox>
				</div>
			</Page>
		</>
	);
}

// export const getStaticProps = (async () => {
// 	// Replace 'topic' with the path to the directory you want to search
// 	async function findDefaultExports(directory: string) {
// 		const { serverRuntimeConfig } = (await import('next/config')).default();

// 		// Get the list of items (files and subdirectories) in the current directory
// 		const fs = await import('fs');
// 		const path = await import('path');
// 		// const dirs = fs.readdirSync(path.resolve(__dirname, directory));
// 		const dirs = fs.readdirSync(
// 			path.join(serverRuntimeConfig.PROJECT_ROOT, './src/pages', directory),
// 		);

// 		const topics: React.ElementType[] = [];
// 		for (const dir of dirs) {
// 			const dirPath = path.join(directory, dir);
// 			const stats = fs.statSync(dirPath);

// 			if (stats.isDirectory()) {
// 				// If it's a directory, recursively search for default export files
// 				findDefaultExports(dirPath);
// 			} else if (stats.isFile() && dir === 'index.ts') {
// 				const baseFile = await import(dirPath).then((module) => module.default);
// 				console.log('Found default export file:', baseFile);
// 				topics.push(baseFile);
// 			}
// 		}
// 		return topics;
// 	}
// 	const topics = await findDefaultExports('./topic');

// 	return { props: { topics } };
// }) satisfies GetStaticProps<{
// 	topics: React.ElementType[];
// }>;

HelpCenter.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { locale }: GetServerSidePropsContext = context;

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
};

export default HelpCenter;
