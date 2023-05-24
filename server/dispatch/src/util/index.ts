import { Coordinates } from "@cd/data-access";

class util {
  
  static isEmpty(obj: any) {
    return obj === undefined || Object.keys(obj).length === 0;
  }

  static getGeoJsonPoint(coordinates: Coordinates) {
    return coordinates.latitude && coordinates.longitude && {
      type: "Point",
      coordinates: [coordinates.longitude, coordinates.latitude],
    } || null;
  }
}

export default util;