import { findLocalOrganizations, ServeUserProximity } from "@cd/data-access";
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

    static async getLocalOrganizations({ userLocation, proximityRadius }: ServeUserProximity) {
        try {
            const local_organizations_ids = await organizations_geo
        .aggregate([
          {
            $geoNear: {
              near: userLocation,
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
        
            const local_organizations = await findLocalOrganizations(local_organizations_ids);
            console.log(`Found ${local_organizations.length} local organizations.`);
            return local_organizations;
        } catch (error) {
            console.error('UserDA error: ', error.message);
            throw new Error(error.message);
        }
    }
}
