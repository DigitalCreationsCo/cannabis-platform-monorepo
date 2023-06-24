import { useRandom } from '@cd/core-lib';
import {
  Center,
  Grid,
  H2,
  LayoutContextProps,
  Page,
  Paragraph,
} from '@cd/ui-lib';
import { NodeNextRequest } from 'next/dist/server/base-http/node';
import Head from 'next/head';

interface StorefrontProps {
  // organization: OrganizationWithShopDetails
  organization: string;
}

export default function StoreFront({
  organization,
}: // products, categories
StorefrontProps) {
  const orgName = 'your favorite Dispensary';

  const tagline = useRandom(expressivePhrases(orgName));
  return (
    <Page gradient="pink" className="sm:pt-12 md:pt-12 bg-transparent w-full">
      <Head>
        <title>Grascannabis.org - Cannabis, Delivered.</title>
        <meta name="Gras App" content="Built by Gras Cannabis Co." />
      </Head>
      <Grid>
        <Center className="bg-transparent md:bg-inverse md:w-[450px] rounded sm:shadow-md space-y-4 p-16 m-auto justify-center">
          <H2 className="whitespace-normal text-yellow md:text-gray drop-shadow-lg sm:drop-shadow-none">
            The Gras Store is coming soon..{' '}
          </H2>

          <Paragraph className="font-semibold text-secondary">
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
  `Check back in August 2023 for the greenest, cleanest shopping experience from ${dispensary} & Gras.`,
  `Check back in August 2023 for a fresh shopping experience from ${dispensary} & Gras.`,
  `Check back in August 2023 for a lush shopping experience from ${dispensary} & Gras.`,
  `Check back in August 2023 for a new budding online experience from ${dispensary} & Gras.`,
  `Check back in August 2023 for this new, sprouting shopping experience from ${dispensary} & Gras.`,
];

StoreFront.getLayoutContext = (): LayoutContextProps => ({
  showHeader: false,
});
