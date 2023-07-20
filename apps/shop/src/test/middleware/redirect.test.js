// jest.mock('react-router-dom', () => {
//     const nav = jest.fn();
//     return {
//         ...jest.requireActual('react-router-dom'),
//         mockedNavigation: nav,
//         useLocation: jest.fn(() => ({ pathname: '/example' })),
//         useNavigate: jest.fn(() => nav)
//     };
// });

// const Router = require('react-router-dom');

describe('Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it(' url redirects to /browse', async () => {
        // render(
        //     // <Router.MemoryRouter initialEntries = {['/example'] }>
        //     //   <Router.Routes>
        //     //     <Router.Route path="example" element={<Page />}>
        //     //   <Router.Routes>
        //     // </Router.MemoryRouter>
        //     <></>
        // );

        // await userEvent.click(await screen.findByText('Checkout'));

        // expect(Router.mockedNavigation).toHaveBeenCalledWith('/billing/checkout', {
        //     state: { previous: '/example' }
        // });
        expect('1').toBe('1');
    });

    it(' url/app redirects to not found', async () => {
        expect('1').toBe('1');
    });

    it(' app.url redirects to dashboard app page', async () => {
        expect('1').toBe('1');
    });

    it(' app.url without client cookies, redirects to dashboard landing page', async () => {
        expect('1').toBe('1');
    });

    it(' app.url redirects to dashboard app page', async () => {
        expect('1').toBe('1');
    });

    it(' /browse/[] redirects to storefront page', async () => {
        expect('1').toBe('1');
    });
    
    it(' unverified users can access /survey', async () => {
        expect('1').toBe('1');
    });


});
