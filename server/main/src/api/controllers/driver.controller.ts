import { DriverDA } from "../data-access";

/* =================================
DriverController - controller class for driver user actions

members:
getDriverById
updateStatus

================================= */


export default class DriverController {
    static async getDriverById(req, res) {
        try {

            const 
            id = req.params.id || '',
            data = await DriverDA.getDriverById(id);

            if (!data) 
            return res.status(404).json('Driver not found');

            return res.status(200).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async updateStatus(req, res) {
        try {

            let 
            { id, onlineStatus } = req.body,
            data = await DriverDA.updateOnlineStatus(id, onlineStatus);

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
            console.log('API error: ', error);
            res.status(500).json({ error: error.message });
        }
    }
}
