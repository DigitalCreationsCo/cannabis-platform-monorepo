import bcrypt from "bcryptjs";
import { Driver, DriverSession } from "../models";
import { DriverDA } from "../data-access";

/*=================================================
DriverController Methods

hashpassword(password)
getDriver


IN PROGRESS   * = more important
-----------
register
login
logout
delete
save (updatePreferences)
createAdminUser (internal use only)

=================================================*/

const hashPassword = async (password) => await bcrypt.hash(password, 10);

export default class DriverController {
  static async updateStatus(req, res) {
    try {
      let { driverId, updateStatus } = req.body;
      let updateResult = await DriverDA.updateOnlineStatus(
        driverId,
        updateStatus
      );
      let { error } = updateResult;
      if (updateResult.error) {
        res.status(400).json({ error });
        return;
      }
      res.json(updateResult);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
  }

  static async updateCurrentLocation(req, res) {
    try {
      console.log("updatCurrentLocation");
      console.log("req.body: ", req.body);
      console.log(Object.values(req.body));
      let { driverId, location } = req.body;
      let updateResult = await DriverDA.updateCurrentLocation(
        driverId,
        location
      );
      let { error } = updateResult;
      if (updateResult.error) {
        res.status(400).json({ error });
        return;
      }
      res.json(updateResult);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
  }

  static async updateOrderDriverPath(req, res) {
    try {
      const { driverPathPacketList } = req.body;
      let updateResult = await DriverDA.updateOrdersDriverPath(
        driverPathPacketList
      );
      let { error } = updateResult;
      if (updateResult.error) {
        res.status(400).json({ error });
        return;
      }
      res.json(updateResult);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
  }

  static async getDriverRecord(req, res) {
    try {
      const driverId = req.params.id || {};
      let driver = await DriverDA.getDriverRecordById(driverId);
      if (!driver) {
        return res.status(404).json({ error: "Driver record not found." });
      }
      res.json(driver);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async getDriverSession(req, res) {
    try {
      const driverId = req.params.id || {};
      let driver = await DriverDA.getDriverSessionById(driverId);
      if (!driver) {
        return res.status(404).json({ error: "Driver session not found." });
      }
      res.json(driver);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  //   static async register(req, res) {
  //     try {
  //       const userFromBody = req.body;
  //       let errors = {};
  //       if (userFromBody) {
  //         if (userFromBody.password.length < 8) {
  //           errors.password = "Your password must be at least 8 characters. ";
  //         }
  //         if (userFromBody.firstName.length < 3) {
  //           errors.firstName = "Your first name must be at least 3 characters. ";
  //         }
  //         if (userFromBody.lastName.length < 3) {
  //           errors.lastName = "Your last name must be at least 3 characters. ";
  //         }
  //         if (userFromBody.email.length < 13) {
  //           errors.email = "Your email must be at least 13 characters. ";
  //         }
  //         // if (userFromBody.address.length < 6) {
  //         //   errors.address = "Please provide your street address of at least 6 characters."
  //         // }
  //         // if (!userFromBody.city) {
  //         //   errors.city = "Please provide your city."
  //         // }
  //         // if (!userFromBody.state) {
  //         //   errors.state = "Please provide your state."
  //         // }
  //         // if (userFromBody.zipcode.length < 5) {
  //         //   errors.zipcode = "Your zipcode must be valid."
  //         // }
  //         if (userFromBody.mobileNumber.length !== 10) {
  //           errors.mobileNumber =
  //             "Please provide a valid 10 digit phone number. ";
  //         }
  //         let checkInt = (val) => {
  //           let match = val.match(/\d/g);
  //           if (match) return match.length === val.length;
  //           else return false;
  //         };
  //         if (!checkInt(userFromBody.mobileNumber)) {
  //           errors.mobileNumber = "Phone number can include only numbers. ";
  //         }
  //         if (!userFromBody.country) {
  //           errors.country = "Please enter a valid country. ";
  //         }
  //         if (userFromBody.userName.length < 7) {
  //           errors.userName = "User name must be at least 7 characters. ";
  //         }
  //       }
  //       if (Object.keys(errors).length > 0) {
  //         return res.status(400).json(errors);
  //       }
  //       userFromBody.email = userFromBody.email.toLowerCase();
  //       userFromBody.password = await hashPassword(userFromBody.password);
  //       const user = new User(userFromBody);
  //       const addUser = await UserDA.addUser(user);
  //       if (!addUser.success) {
  //         console.log("error adding user");
  //         errors.registerError = addUser.error;
  //         return res.status(400).json(errors);
  //       }
  //       const userFromDB = await UserDA.getUserByEmail(user.email);
  //       if (!userFromDB) {
  //         errors.general = "Internal error, please try again later";
  //       }
  //       if (Object.keys(errors).length > 0) {
  //         return res.status(400).json(errors);
  //       }
  //       const passwordMatch = userFromDB.password === user.password;
  //       if (passwordMatch) {
  //         const loginResponse = await UserDA.loginUser(user, user.encoded());
  //         if (!loginResponse.success) {
  //           return res.status(500).json({ error: loginResponse.error });
  //         }
  //         res.json({
  //           auth_token: user.encoded(),
  //           info: user.toJson(),
  //         });
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       res.status(500).json({ error: e });
  //     }
  //   }
  //   static async login(req, res) {
  //     try {
  //       let { email, password } = req.body;
  //       if (!email || typeof email !== "string") {
  //         res.status(400).json({ error: "Bad email format, expected string." });
  //         return;
  //       }
  //       email = email.toLowerCase();
  //       if (!password || typeof password !== "string") {
  //         res
  //           .status(400)
  //           .json({ error: "Bad password format, expected string." });
  //         return;
  //       }
  //       let userData = await UserDA.getUserByEmail(email);
  //       if (!userData) {
  //         res.status(401).json({ error: "This user does not exist" });
  //         return;
  //       }
  //       const user = new User(userData);
  //       // change the DAO function for login, to update instead of insert, if there is an
  //       // existing doc in the collection, update the existing one!
  //       // UserDA.login()
  //       //check for password match using hashpassword or plain text from client
  //       const passwordMatch = await user.comparePassword(password);
  //       if (password === user.password || passwordMatch) {
  //         const loginResponse = await UserDA.loginUser(user, user.encoded());
  //         if (!loginResponse.success) {
  //           return res.status(500).json({ error: loginResponse.error });
  //         }
  //         res.json({
  //           auth_token: user.encoded(),
  //           info: user.toJson(),
  //         });
  //       } else {
  //         res.status(401).json({ error: "Incorrect Password" });
  //         return;
  //       }
  //     } catch (e) {
  //       res.status(400).json({ error: e });
  //       return;
  //     }
  //   }
  //   static async logout(req, res) {
  //     try {
  //       const userJwt = req.get("Authorization").slice("Bearer ".length);
  //       const userObj = await User.decoded(userJwt);
  //       var { error } = userObj;
  //       if (error) {
  //         res.status(401).json({ error });
  //         return;
  //       }
  //       const logoutResult = await UserDA.logoutUser(userObj.email);
  //       var { error } = logoutResult;
  //       if (error) {
  //         res.status(500).json({ error });
  //         return;
  //       }
  //       res.json(logoutResult);
  //     } catch (e) {
  //       res.status(500).json(e);
  //     }
  //   }
  //   static async delete(req, res) {
  //     try {
  //       let { password } = req.body;
  //       if (!password || typeof password !== "string") {
  //         res
  //           .status(400)
  //           .json({ error: "Bad password format, expected string." });
  //         return;
  //       }
  //       const userJwt = req.get("Authorization").slice("Bearer ".length);
  //       const userClaim = await User.decoded(userJwt);
  //       var { error } = userClaim;
  //       if (error) {
  //         res.status(401).json({ error });
  //         return;
  //       }
  //       const user = new User(await UserDA.getUserByEmail(userClaim.email));
  //       if (!(await user.comparePassword(password))) {
  //         res.status(401).json({ error: "Make sure your password is correct." });
  //         return;
  //       }
  //       const deleteResult = await UserDA.deleteUser(user.email);
  //       var { error } = deleteResult;
  //       if (error) {
  //         res.status(500).json({ error });
  //         return;
  //       }
  //       res.json(deleteResult);
  //     } catch (e) {
  //       res.status(500).json(e);
  //     }
  //   }
  //   static async save(req, res) {
  //     try {
  //       const userJwt = req.get("Authorization").slice("Bearer ".length);
  //       const userFromHeader = await User.decoded(userJwt);
  //       var { error } = userFromHeader;
  //       if (error) {
  //         res.status(401).json({ error });
  //         return;
  //       }
  //       await UserDA.updatePreferences(
  //         userFromHeader.email,
  //         req.body.preferences
  //       );
  //       const userFromDB = await UserDA.getUserByEmail(userFromHeader.email);
  //       const updatedUser = new User(userFromDB);
  //       res.json({
  //         auth_token: updatedUser.encoded(),
  //         info: updatedUser.toJson(),
  //       });
  //     } catch (e) {
  //       res.status(500).json(e);
  //     }
  //   }
  //   // for internal use only
  //   static async createAdminUser(req, res) {
  //     try {
  //       const userFromBody = req.body;
  //       let errors = {};
  //       if (userFromBody && userFromBody.password.length < 8) {
  //         errors.password = "Your password must be at least 8 characters.";
  //       }
  //       if (userFromBody && userFromBody.name.length < 3) {
  //         errors.name = "You must specify a name of at least 3 characters.";
  //       }
  //       if (Object.keys(errors).length > 0) {
  //         res.status(400).json(errors);
  //         return;
  //       }
  //       const userInfo = {
  //         ...userFromBody,
  //         password: await hashPassword(userFromBody.password),
  //       };
  //       const insertResult = await UserDA.addUser(userInfo);
  //       if (!insertResult.success) {
  //         errors.email = insertResult.error;
  //       }
  //       if (Object.keys(errors).length > 0) {
  //         res.status(400).json(errors);
  //         return;
  //       }
  //       const makeAdminResponse = await UserDA.makeAdmin(userFromBody.email);
  //       const userFromDB = await UserDA.getUserByEmail(userFromBody.email);
  //       if (!userFromDB) {
  //         errors.general = "Internal error, please try again later";
  //       }
  //       if (Object.keys(errors).length > 0) {
  //         res.status(400).json(errors);
  //         return;
  //       }
  //       const user = new User(userFromDB);
  //       const jwt = user.encoded();
  //       const loginResponse = await UserDA.loginUser(user.email, jwt);
  //       res.json({
  //         auth_token: jwt,
  //         info: user.toJson(),
  //       });
  //     } catch (e) {
  //       res.status(500).json(e);
  //     }
  //   }
}
