export const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = {
        user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', memberships: [{ organizationId: '2' }] },
    };
    const { user } = session;
    return {
        session,
        user,
    };
};
