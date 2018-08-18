import mapWateringStation from './mapWateringStation';

/**
 * @public
 * @function findWateringStation
 * @description find watering station in the database
 * @param {object} wateringStationDbService - the watering station database service
 * @returns {Promise} of watering station
 */
const findWateringStation = (wateringStationDbService) => (_, { wateringStationId }) => {
   return wateringStationDbService.findWateringStation(wateringStationId)
      .then(wateringStation => mapWateringStation(wateringStation));
};

export default findWateringStation;