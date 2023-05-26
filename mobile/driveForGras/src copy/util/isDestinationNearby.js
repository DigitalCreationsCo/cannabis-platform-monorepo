function getDistanceInMeters([x1, y1], [x2, y2]) {
  let x = x2 - x1;
  let y = y2 - y1;

  return Math.sqrt(x * x + y * y) * 100000;
}
getDistanceInMeters([40.041187, -76.267178], [40.040879, -76.267474]);

export const isDestinationNearby = (
  startCoordinates,
  destinationCoordinates,
  distance
) => {
  return (
    getDistanceInMeters(startCoordinates, destinationCoordinates) <= distance
  );
};
