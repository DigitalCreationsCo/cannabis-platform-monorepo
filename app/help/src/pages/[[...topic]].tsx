import {
	FlexBox,
	H1,
	H3,
	Page,
	Paragraph,
	styles,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { helpTopics } from '../components/HelpTopics';

function HelpCenterHome() {
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
		[topic],
	);
	return (
		<Page className="bg-light">
			<div className="mx-auto">
				<div className={twMerge(styles.HERO.container, 'hidden md:block')}>
					<H1 className="text-primary text-center">We're here to help.</H1>
				</div>
				<div className="tabs hidden gap-2 md:block">
					{Object.keys(helpTopics).map((key) => (
						<Link
							href={`?topic=${key}`}
							key={`help-topic-${key}`}
							onClick={() => setTopic(key as keyof typeof helpTopics)}
						>
							<Paragraph
								className={twMerge([
									'font-semibold',
									topic === key
										? 'tab tab-bordered tab-active'
										: 'tab tab-bordered',
									'hover:bg-gray-100 rounded-btn btn-ghost btn capitalize',
									topic === key ? 'text-primary' : 'text-dark-soft',
								])}
							>
								{key}
							</Paragraph>
						</Link>
					))}
				</div>
				<FlexBox className="p-1 md:items-center md:py-8 xl:items-center">
					<HelpComponent />
				</FlexBox>
			</div>
		</Page>
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

HelpCenterHome.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
});
export default HelpCenterHome;
