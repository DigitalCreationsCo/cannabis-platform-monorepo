import { getGeoCoordinatesFromAddress } from '@cd/core-lib';
import { OrganizationCreateType } from '@cd/data-access';
import { OrganizationDA } from '../data-access';
const Busboy = require('busboy');

/* =================================
OrganizationController - controller class for organization management actions

members:
createOrganization
updateOrganization
deleteOrganizationById
getOrganizationById
getOrganizationByZipcode
getCategoryList
getUsersByOrganization

================================= */

export default class OrganizationController {
  static async createOrganization(req, res) {
    try {
      const organization = req.body;

      const coordinates = await getGeoCoordinatesFromAddress(
        organization.address
      );
      if (coordinates) organization.address.coordinates = coordinates;

      const data = await OrganizationDA.createOrganization(organization);

      if (!data)
        return res.status(404).json({
          success: false,
          message: 'Organization could not be created.',
        });

      return res.status(201).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.info('API error: ', error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateOrganization(req, res) {
    try {
      const organization: OrganizationCreateType = req.body;

      const data = await OrganizationDA.updateOrganization(organization);

      if (!data)
        return res.status(404).json({
          success: false,
          message: 'Organization could not be created.',
        });

      return res.status(201).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.info('API error: ', error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteOrganizationById(req, res) {
    try {
      const organizationId = req.params.id || '';

      const data = await OrganizationDA.deleteOrganization(organizationId);

      if (!data)
        return res.status(404).json({
          success: false,
          message: 'Organization could not be deleted.',
        });

      return res.status(201).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.info('API error: ', error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getOrganizationById(req, res) {
    try {
      const organizationId = req.params.id || '';

      const data = await OrganizationDA.getOrganizationById(organizationId);

      if (!data)
        return res.status(404).json({
          success: false,
          message: 'Dispensary not found',
        });

      return res.status(200).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getOrganizationsByZipcode(req, res) {
    try {
      const {
        zipcode,
        limit,
        radius,
      }: { zipcode: number; limit: number; radius: number } = req.params;

      const data = await OrganizationDA.getOrganizationsByZipcode(
        Number(zipcode),
        Number(limit),
        Number(radius)
      );

      if (!data)
        return res.status(404).json({
          success: false,
          message: `We didn't find dispensaries.`,
        });

      console.info(`Found ${data.length} organizations in zipcode ${zipcode}`);
      return res.status(200).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.info('API error: ', error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getCategoryList(req, res) {
    try {
      const organizationId = req.params.id || '';

      const data = await OrganizationDA.getCategoryList(organizationId);

      if (!data)
        return res.status(404).json({
          success: false,
          message: 'Categories not found',
        });

      return res.status(200).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.info('API error: ', error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getUsersByOrganization(req, res) {
    try {
      const organizationId = req.params.id || '';

      const data = await OrganizationDA.getUsersByOrganization(organizationId);

      if (!data)
        return res.status(404).json({
          success: false,
          message: `We didn't find this data.`,
        });

      return res.status(200).json({
        success: true,
        payload: data,
      });
    } catch (error: any) {
      console.info('API error: ', error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
