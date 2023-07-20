import { getGeoCoordinatesFromAddress } from '@cd/core-lib';
import { UserCreateType } from '@cd/data-access';
import { DriverDA } from '../data-access';

/* =================================
DriverController - controller class for driver user actions

members:
createDriver
getDriverById
updateStatus

================================= */

export default class DriverController {
  static async createDriver(req, res) {
    try {
      const user = req.body as UserCreateType;

      const coordinates = await getGeoCoordinatesFromAddress(user.address[0]);

      if (coordinates) user.address[0].coordinates = coordinates;

      const data = await DriverDA.createDriver(user);

      if (!data) return res.status(404).json('Driver could not be created.');

      return res.status(201).json(data);
    } catch (error: any) {
      console.info('API error: ', error);
      if (error.message.includes('This User exists already')) {
        return res.status(400).json({ error });
      } else res.status(500).json({ error });
    }
  }

  static async updateDriver(req, res) {
    try {
      const driver = req.body;

      const data = await DriverDA.updateDriver(driver);

      if (!data)
        return res.status(404).json('Driver record could not be updated.');

      return res.status(200).json(data);
    } catch (error: any) {
      console.info('API error: ', error);
      res.status(500).json({ error });
    }
  }

  static async getDriverById(req, res) {
    try {
      const id = req.params.id || '',
        data = await DriverDA.getDriverById(id);

      if (!data) return res.status(404).json('Driver not found');

      return res.status(200).json(data);
    } catch (error: any) {
      console.info('API error: ', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      let { id, onlineStatus } = req.body;

      const data = await DriverDA.updateOnlineStatus(id, onlineStatus);

      // have a promise.all here, that updates the driver's status in the driverSessions collection

      if (!data.success) {
        if (onlineStatus === true)
          return res.status(404).json('Could not go online. Please try again.');

        if (onlineStatus === false)
          // ignore
          return;
      }

      return res.status(200).json(data);
    } catch (error: any) {
      console.info('API error: ', error);
      res.status(500).json({ error: error.message });
    }
  }
}
