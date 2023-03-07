export default function StoreFront({
    organization
    // products, categories
}) {
    return <div>Welcome to {organization} storefront</div>;
}

export async function getServerSideProps({ req }) {
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
    return { props: { organization: req.headers.host } };
}
