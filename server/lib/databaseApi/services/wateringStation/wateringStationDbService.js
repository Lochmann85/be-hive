import { wateringStations } from './wateringStationsTable';

import findAllWateringStationsTemplate from './findAllWateringStations';
import findWateringStationTemplate from './findWateringStation';

/**
 * @public
 * @function create
 * @description watering station db service factory
 * @returns {Promise} of database watering station service
 */
const create = () => {
   const wateringStationDbServices = Object.freeze({
      findAllWateringStations: findAllWateringStationsTemplate(wateringStations),
      findWateringStation: findWateringStationTemplate(wateringStations),
   });

   return Object.freeze({
      name: "wateringStationDbService",
      services: wateringStationDbServices
   });
};

export {
   create,
};