/* =================================
UserController - controller class for user actions

members:
login

================================= */

export default class UserController {
    static async login(req, res) {
        try {
            let userId = 'User1';
            let jwtPayload = { name: 'spooky action at a distance' };
            let sessionData = { awesomeThings: ['programming', 'javascript', 'supertokens'] };

            await supertokens.createNewSession(res, userId, jwtPayload, sessionData);

            res.send('logged in');
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}
