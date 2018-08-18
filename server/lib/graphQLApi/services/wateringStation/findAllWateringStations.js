/**
 * @public
 * @function findAllWateringStations
 * @description find all watering stations in the database
 * @param {object} wateringStationDbService - the watering station database service
 * @returns {Promise} of all watering stations
 */
const findAllWateringStations = (wateringStationDbService) => () => {
   return wateringStationDbService.findAllWateringStations()
      .then(wateringStations => {
         return wateringStations.map(wateringStation => {
            const mappedWateringTimes = wateringStation.wateringTimes.map((watering, index) => ({
               id: `${wateringStation.id}${index}`,
               time: watering.time,
               duration: watering.duration
            }));
            return {
               id: wateringStation.id,
               wateringTimes: mappedWateringTimes,
               name: wateringStation.name,
               description: wateringStation.description,
               isActive: wateringStation.isActive
            };
         });
      });
};

export default findAllWateringStations;