import { selectOrganization, TextContent } from '@cd/core-lib';
import { type OrganizationWithShopDetails } from '@cd/data-access';
import {
	Center,
	Grid,
	H2,
	Page,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Head from 'next/head';
import { useAppSelector } from '../../redux/hooks';
import { wrapper } from '../../redux/store';

function Storefront({ organizationId }: { organizationId: string }) {
	const organization = useAppSelector(
		selectOrganization(organizationId),
	) as OrganizationWithShopDetails;

	return (
		<Page gradient="pink" className="w-full bg-transparent sm:pt-12 md:pt-12">
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			<Grid>
				<Center className="md:bg-inverse m-auto justify-center space-y-4 rounded bg-transparent p-16 sm:shadow-md md:w-[450px]">
					<H2 className="text-yellow md:!text-primary whitespace-normal drop-shadow-lg sm:drop-shadow-none">
						{organization?.name}
					</H2>
					<Paragraph className="text-secondary font-semibold"></Paragraph>
				</Center>
			</Grid>
		</Page>
	);
}

Storefront.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default Storefront;

export const getServerSideProps = wrapper.getServerSideProps(
	() =>
		async ({ query }: any) => {
			try {
				if (!query['storefront'])
					throw new Error(TextContent.error.DISPENSARY_NOT_FOUND);
				return {
					props: {
						organizationId: query['storefront'],
					},
				};
			} catch (error) {
				console.log(`StoreFront SSP: ${error}`);
				return {
					notFound: true,
				};
			}
		},
);
