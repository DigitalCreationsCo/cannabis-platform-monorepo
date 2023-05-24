import { DriverDA } from "../data-access";

/* =================================
DriverController - controller class for driver user actions

members:
getDriverById

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
}
