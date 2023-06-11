import { getCoordinatePairFromUserLocation } from '@cd/core-lib';
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
            const { userLocation, proximityRadius } = req.body;

            const coordinates = getCoordinatePairFromUserLocation(userLocation);

            const data = await LocationDA.getLocalOrganizations(
                coordinates,
                proximityRadius
            );
            if (!data) return res.status(404).json('Local organizations were not found.');
            return res.status(201).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    /**
     * Create a dispensary record for geonear lookup
     * @param req 
     * @param res 
     * @returns 
     */
    static async addOrganizationLocationRecord(req, res) {
        try {
            const organization = req.body as OrganizationWithShopDetails;
            const data = await LocationDA.addOrganizationMongoRecord(organization);
            if (!data) return res.status(404).json('Could not create the dispensary record.');
            console.log('successfully created dispensary location record: ', organization.name, ': ', organization.id);
            return res.status(201).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    /**
     * Create a dispensary record for geonear lookup
     * @param req 
     * @param res 
     * @returns 
     */
    static async updateOrganizationLocationRecord(req, res) {
        try {
            const organization = req.body as OrganizationWithShopDetails;
            const data = await LocationDA.updateOrganizationMongoRecord(organization);
            if (!data) return res.status(404).json('Could not update the dispensary record.');
            return res.status(201).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}