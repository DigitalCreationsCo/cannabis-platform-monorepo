import { findMultipleOrganizationsById, OrganizationWithShopDetails } from "@cd/data-access";
import { MongoClient } from "mongodb";

/* =================================
Location Data Access - data methods using Address or Coordinate data as input

members:
getLocalOrganizations // returns organizations within a specified proximity radius of a user's location (this method queries mongodb, and subsequent query to mysql)

================================= */

let organizations_geo = null
const GEO_DB_NS = process.env.GEO_DB_NS;

export default class LocationDA {
    static async useMongoDB(mongoClient: MongoClient){
        if (organizations_geo) return
        try {
            organizations_geo = await mongoClient.db(GEO_DB_NS).collection("organizations_geo");
          } catch (e) {
            console.error(
              `Unable to establish collection handle in LocationDA: ${e}`
            );
          }
    }

    static async getLocalOrganizations(coordinates: number[], proximityRadius: number) {
        try {
          console.log('coordinates: ', coordinates)
          console.log('proximityRadius: ', proximityRadius)

            const local_organizations_ids = await organizations_geo
        .aggregate([
          {
            $geoNear: {
              near: coordinates,
              distanceField: "vendorDistanceFromUser",
              maxDistance: proximityRadius,
              spherical: true,
            },
          },
          {
            $sort: {
              vendorDistanceFromUser: 1,
            },
          },
        ])
        .toArray();
        console.log('mongo local_organizations_ids: ', local_organizations_ids)
        
            const local_organizations = await findMultipleOrganizationsById(local_organizations_ids);
            console.log(`Found ${local_organizations.length} local organizations.`);
            return local_organizations;
        } catch (error: any) {
            console.error('LocationDA error: ', error.message);
            throw new Error(error.message);
        }
    }

    static async addOrganizationMongoRecord(organization: OrganizationWithShopDetails) {
      try {
          const newOrganization = await organizations_geo.insertOne({ 
            id: organization.id,
            address: { ...organization.address,
            coordinates: [Number(organization.address.coordinates.longitude), Number(organization.address.coordinates.latitude)]},
          })
          console.log('created mongo organization record: ', newOrganization.id)
          return newOrganization
      } catch (error: any) {
          console.error('LocationDA error: ', error.message);
          throw new Error(error.message);
      }
  }

  static async updateOrganizationMongoRecord(organization: OrganizationWithShopDetails) {
    try {

      const updateOrganization = await organizations_geo.updateOne(
        { id: organization.id },
        { $set: {
          ...organization,
          address: { ...organization.address,
          coordinates: [Number(organization.address.coordinates.longitude), Number(organization.address.coordinates.latitude)]},
        } });

        console.log('update mongo organization record: ', updateOrganization.id)
        return updateOrganization
    } catch (error: any) {
        console.error('LocationDA error: ', error.message);
        throw new Error(error.message);
    }
}
}
