import { useRandom } from '@cd/core-lib';
import {
	Center,
	Grid,
	H2,
	Page,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { type NodeNextRequest } from 'next/dist/server/base-http/node';
import Head from 'next/head';

export default function StoreFront() {
	const orgName = 'your favorite Dispensary';

	const tagline = useRandom(expressivePhrases(orgName));
	return (
		<Page
			gradient="pink"
			className="w-full bg-transparent sm:pt-12 md:pt-12"
		>
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			<Grid>
				<Center className="md:bg-inverse m-auto justify-center space-y-4 rounded bg-transparent p-16 sm:shadow-md md:w-[450px]">
					<H2 className="text-yellow md:!text-primary whitespace-normal drop-shadow-lg sm:drop-shadow-none">
						The Gras Store is coming soon..{' '}
					</H2>

					<Paragraph className="text-secondary font-semibold">
						{tagline}
					</Paragraph>
				</Center>
			</Grid>
		</Page>
	);
}

export async function getServerSideProps({ req }: { req: NodeNextRequest }) {
	// const subDomain = await prisma.subDomain.findUnique({
	//     where: {
	//         id: req.headers.host
	//     },
	//     include: {
	//         organization: {
	//             include: {
	//                 address: true,
	//                 products: true,
	//                 images: true,
	//                 siteSetting: true,
	//                 categoryList: true
	//             }
	//         }
	//     }
	// });

	// if (!subDomain) {
	//     return {
	//         props: {
	//             error: 'The domain was not registered in the app'
	//         }
	//     };
	// }

	// return {
	//     props: {
	//         organization: subDomain.organization,
	//         products: subDomain.organization.products
	//     }
	// };
	return { props: { organization: req?.headers?.host?.split('.')[0] } };
}

const expressivePhrases = (dispensary: string) => [
	`Check back in August 2023 for a green shopping experience from ${dispensary} & Gras.`,
	`Check back in August 2023 for a fresh shopping experience from ${dispensary} & Gras.`,
	`Check back in August 2023 for a lush shopping experience from ${dispensary} & Gras.`,
	`Check back in August 2023 for a new budding online experience from ${dispensary} & Gras.`,
	`Check back in August 2023 for a sprouting shopping experience from ${dispensary} & Gras.`,
	`Check back in August 2023 for the new shopping experience taking roots from ${dispensary} & Gras.`,
];

StoreFront.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});
