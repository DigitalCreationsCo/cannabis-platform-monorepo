import { findMultipleOrganizationsById, OrganizationWithShopDetails } from "@cd/data-access";
import { Collection, MongoClient } from "mongodb";

/* =================================
Location Data Access - data methods regarding location, address, and geosptial queries

members:
useMongoDB
getLocalOrganizations // returns organizations within a specified proximity radius of a user's location (this method queries mongodb, and subsequent query to mysql)
addOrganizationMongoRecord
updateOrganizationMongoRecord
================================= */

let
orgGeolocate: Collection | null = null

const 
location_namespace = process.env.LOCATION_DB_NS;

export default class LocationDA {
    static async useMongoDB (mongoClient: MongoClient) {
        
      if (orgGeolocate) 
      return
      
      try {
        orgGeolocate = await mongoClient.db(location_namespace).collection("organizations_geolocate");
      } catch (e) {
        console.error(`Unable to establish collection handle in LocationDA: ${e}`);
      }
    }

    /**
     * Returns organization records (dispensaries) within a specified proximity 
     * radius of a user's location 
     * - this method queries mongodb for geospatial query,
     * - and subsequent query to mysql for organization details
     * @param coordinates 
     * @param proximityRadius 
     * @returns 
     */
    static async getLocalOrganizations(coordinates: number[], proximityRadius: number) {
      try {
        const 
        localOrganizationsIdDocuments = await orgGeolocate
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
          {
            $project: {
              _id: 0,
              id: 1,
            }
          }
        ])
        .toArray()
        console.log('mongo local_organizations_ids: ', localOrganizationsIdDocuments)
    
        const localOrganizationIds:string[] = []
        for (let i=0;i<localOrganizationsIdDocuments.length;i++) {
          localOrganizationIds.push(localOrganizationsIdDocuments[i].id)
        }

        const 
        localOrganizations = await findMultipleOrganizationsById(localOrganizationIds);
        
        console.log(`Found ${localOrganizations.length} local organizations.`);
        
        return localOrganizations;
          
      } catch (error: any) {
          console.error('LocationDA error: ', error.message);
          throw new Error(error.message);
      }
    }

    /** 
     * Creates a new record in the organizations_geolocate collection,
     * which is used to query for local organizations based on a user's location
     */
    static async addOrganizationMongoRecord(organization: OrganizationWithShopDetails) {
      try {
        
        let
        { address, ...rest } = organization;

        const 
        newOrganization = await orgGeolocate.insertOne({ 
          id: organization.id,
          address: { 
            ...address,
            coordinates: [Number(organization.address.coordinates.longitude), Number(organization.address.coordinates.latitude)]
          },
          ...rest
        })

        return newOrganization
        
      } catch (error: any) {
          console.error('LocationDA error: ', error.message);
          throw new Error(error.message);
      }
    }

  static async updateOrganizationMongoRecord(organization: OrganizationWithShopDetails) {
    try {

      const updateOrganization = await orgGeolocate.updateOne(
        { id: organization.id },
        { $set: {
          ...organization,
          address: { ...organization.address,
          coordinates: [Number(organization.address.coordinates.longitude), Number(organization.address.coordinates.latitude)]},
        } });

        return updateOrganization;

    } catch (error: any) {
        console.error('LocationDA error: ', error.message);
        throw new Error(error.message);
    }
}
}
