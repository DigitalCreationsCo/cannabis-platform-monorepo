/* =================================
Location Data Access - data methods using Address or Coordinate data as input

members:
getLocalOrganizations

================================= */

import { ServeUserProximity } from "@cd/data-access";

export default class LocationDA {
    static async getLocalOrganizations({ userLocation, proximityRadius }: ServeUserProximity) {
        try {
            const local_organizations = await findLocalOrganizations({ userLocation, proximityRadius });
            console.log(`Found ${local_organizations.length} local organizations.`);
            return local_organizations;
        } catch (error) {
            console.error('UserDA error: ', error.message);
            throw new Error(error.message);
        }
    }
}
