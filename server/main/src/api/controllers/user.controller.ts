import { getGeoCoordinatesFromAddress } from '@cd/core-lib';
import { UserCreateType } from '@cd/data-access';
import { UserDA } from '../data-access';

/* =================================
UserController - controller class for user business actions

members:
createUser
updateUser
createDispensaryAdmin
updateDispensaryAdmin
signin                  not used
signout                 not used 
getUserById
getAddressById
addAddressToUser
removeAddressFromUser
signup                  not used

================================= */

export default class UserController {
  static async createUser(req, res) {
    try {
      const rawUser = req.body;

      // address data comes as an object, but we need it as an array per data schema
      const user: UserCreateType = { ...rawUser, address: [rawUser.address] };

      const coordinates = await getGeoCoordinatesFromAddress(user.address[0]);

      if (coordinates) user.address[0].coordinates = coordinates;

      const data = await UserDA.upsertUser(user);

      console.log('user created: ', data);
      if (!data) return res.status(404).json('User could not be created.');

      return res.status(201).json(data);
    } catch (error: any) {
      console.log('API error: ', error);
      if (error.message.includes('This user exists already')) {
        return res.status(400).json({ error });
      } else res.status(500).json({ error });
    }
  }

  static async createDispensaryAdmin(req, res) {
    try {
      let { user, role, dispensaryId } = req.body;

      function addressObjectIntoArray(user): UserCreateType {
        const address = user.address;

        if (address) user.address = [address];

        return user;
      }

      user = addressObjectIntoArray(user);

      const data = await UserDA.createDispensaryAdmin(user, role, dispensaryId);

      if (!data)
        return res.status(404).json('Dispensary user could not be created.');

      return res.status(201).json(data);
    } catch (error: any) {
      console.log('API error: ', error);
      if (error.message.includes('This user exists already')) {
        console.log('yes, EXIST ALREADY');
        return res.status(400).json(error.message);
      } else res.status(500).json({ error });
    }
  }

  static async updateDispensaryAdmin(req, res) {
    try {
      const { user, role, dispensaryId } = req.body;

      const data = await UserDA.updateDispensaryAdmin(user, role, dispensaryId);
      if (!data) return res.status(404).json('User could not be created.');

      return res.status(200).json(data);
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = req.body;

      const data = await UserDA.updateUser(user);
      if (!data)
        return res.status(404).json('User record could not be updated.');

      return res.status(200).json(data);
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id || '';
      const data = await UserDA.getUserById(id);
      if (!data) return res.status(404).json('User not found');
      return res.status(200).json(data);
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  static async getAddressById(req, res) {
    try {
      const { id = '', addressId = '' } = req.params;
      const data = await UserDA.getAddressById(addressId);
      if (!data) return res.status(404).json('Address not found');
      return res.status(200).json(data);
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  static async addAddressToUser(req, res) {
    try {
      const address = req.body;
      const data = await UserDA.addAddressToUser(address);
      if (!data) return res.status(404).json('Address was not created');
      return res.status(200).json(data);
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  static async removeAddressFromUser(req, res) {
    try {
      const { id = '', addressId = '' } = req.params;
      const data = await UserDA.removeAddressFromUser({
        addressId,
        userId: id,
      });
      if (!data) return res.status(404).json('Address not found');
      return res.status(200).json(data);
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  // static async signup(req, res):Promise<SessionResponsePayload> {
  //     try {
  //         // form values from client
  //         const createUserData = req.body;

  //         // create user record in db
  //         const user = await UserDA.createUser(createUserData);

  //         // // access token payload
  //         const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };

  //         // // create supertokens session
  //         const sessionToken = await STSession.createNewSession(res, user.id, sessionPayload, { data: 'SESSION TEST DATA' }, user);

  //         // // future note: drivers will have only session active on a device.
  //         // // Drivers will need their own session function for login
  //         const session = await UserDA.createUserSession(sessionToken.getHandle(), sessionPayload, await sessionToken.getExpiry())

  //         const signedUp = await signUp(user.email, user.passwordHash, user)
  //         return res.status(200).json({
  //             status: true,
  //             message: 'Your account is created!',
  //             session
  //         });
  //     } catch (error: any) {
  //         return res.status(200).json({
  //             status: false,
  //             message: error.message,
  //             session: null
  //         });
  //         // if (error.message === 'This user exists already. Please choose a different username or email.') {
  //         //     return res.status(400).json(error:any)
  //         // }
  //         // console.log('API error: ', error.message);
  //         // return res.status(500).json(error:any);
  //     }
  // }
}

export type SessionResponsePayload = {
  status: boolean;
  message: string;
  session: any;
};
