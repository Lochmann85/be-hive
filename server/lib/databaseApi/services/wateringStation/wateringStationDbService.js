import findAllWateringStationsTemplate from './findAllWateringStations';

/**
 * @public
 * @function create
 * @description watering station db service factory
 * @param {object} models - the database models
 * @returns {Promise} of database watering station service
 */
const create = (
   models,
) => {
   const wateringStationDbServices = Object.freeze({
      findAllWateringStations: findAllWateringStationsTemplate(models.wateringStation),
   });

   return Object.freeze({
      name: "wateringStationDbService",
      services: wateringStationDbServices
   });
};

export {
   create,
};