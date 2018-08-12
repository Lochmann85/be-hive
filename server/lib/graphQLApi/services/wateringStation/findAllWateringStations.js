/**
 * @public
 * @function findAllWateringStations
 * @description find all watering stations in the database
 * @param {object} wateringStationDbService - the watering station database service
 * @returns {Promise} of all watering stations
 */
const findAllWateringStations = (wateringStationDbService) => () => {
   return wateringStationDbService.findAllWateringStations();
};

export default findAllWateringStations;