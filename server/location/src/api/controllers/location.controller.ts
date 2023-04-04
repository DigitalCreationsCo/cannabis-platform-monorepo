import { OrganizationWithShopDetails } from '@cd/data-access';
import { LocationDA } from '../data-access';
/* =================================
Locationontroller - controller class for location-based actions

members:
getLocalOrganizations

================================= */

export default class LocationController {
    static async getLocalOrganizations(req, res) {
        try {
            console.log('Location Controller: getLocalOrganizations');
            console.log('request body: ', req.body);
            const { userLocation, proximityRadius } = req.body;
            const data = await LocationDA.getLocalOrganizations({
                userLocation,
                proximityRadius
            });
            if (!data) return res.status(404).json('Local organizations were not found.');
            return res.status(201).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async addOrganizationLocationRecord(req, res) {
        try {
            console.log('Location Controller: addOrganizationLocationRecord');
            const organization = req.body as OrganizationWithShopDetails;
            const data = await LocationDA.addOrganizationMongoRecord(organization);
            if (!data) return res.status(404).json('Could not create the dispensary record.');
            return res.status(201).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}
