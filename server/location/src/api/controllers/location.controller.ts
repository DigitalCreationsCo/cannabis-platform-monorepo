import { getCoordinatePairFromUserLocation } from '@cd/core-lib';
import { OrganizationWithShopDetails } from '@cd/data-access';
import { LocationDA } from '../data-access';
/* =================================
Locationontroller - controller class for location-based actions

members:
getLocalOrganizations
createOrganizationLocationRecord
updateOrganizationLocationRecord
deleteOrganizationLocationRecord
================================= */

export default class LocationController {
  static async getLocalOrganizations(req, res) {
    try {
      const { userLocation, proximityRadius } = req.body;

      const _geoJson = getCoordinatePairFromUserLocation(userLocation);

      const data = await LocationDA.getLocalOrganizations(
        _geoJson,
        proximityRadius
      );
      if (!data)
        return res.status(404).json('Local organizations were not found.');
      return res.status(201).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  /**
   * Create a dispensary record from organizations_geolocate collection
   * @param req
   * @param res
   * @returns
   */
  static async createOrganizationLocationRecord(req, res) {
    try {
      const organization = req.body as OrganizationWithShopDetails;

      console.log(
        'organization to add: ',
        organization.name,
        ': ',
        organization.id
      );
      const data = await LocationDA.createOrganizationMongoRecord(organization);

      if (!data)
        return res.status(404).json('Could not create the dispensary record.');

      console.log(
        'successfully created dispensary location record: ',
        organization.name,
        ': ',
        organization.id
      );

      return res.status(201).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  /**
   * Create a dispensary record from organizations_geolocate collection
   * @param req
   * @param res
   * @returns
   */
  static async updateOrganizationLocationRecord(req, res) {
    try {
      const organization = req.body as OrganizationWithShopDetails;
      const data = await LocationDA.updateOrganizationMongoRecord(organization);
      if (!data)
        return res.status(404).json('Could not update the dispensary record.');
      return res.status(201).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }

  /**
   * Delete a dispensary record from organizations_geolocate collection
   * @param req
   * @param res
   * @returns
   */
  static async deleteOrganizationLocationRecord(req, res) {
    try {
      const organizationId = req.params.id || '';
      const data = await LocationDA.deleteOrganizationMongoRecord(
        organizationId
      );
      if (!data)
        return res.status(404).json('Could not delete the dispensary record.');
      return res.status(200).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.log('API error: ', error);
      res.status(500).json({ error });
    }
  }
}
