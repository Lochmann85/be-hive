import findAllWateringStationsTemplate from './findAllWateringStations';
import findWateringStationTemplate from './findWateringStation';

const types = `
type WateringStation {
   id: ID!
   name: String
   description: String
   isActive: Boolean
   wateringTimes: [WateringTime!]
}
type WateringTime {
   id: ID!
   time: String
   duration: Int
}
`;

const queries = `
   findAllWateringStations: [WateringStation!]
   findWateringStation(wateringStationId: ID): WateringStation!
`;

const queriesResolver = (wateringStationDbService) => ({
   findAllWateringStations: findAllWateringStationsTemplate(wateringStationDbService),
   findWateringStation: findWateringStationTemplate(wateringStationDbService),
});

/**
 * @public
 * @function create
 * @description wateringStation graphQL service factory
 * @param {object} database - the database wrapper
 * @returns {Promise} of graphQL watering station service
 */
const create = (
   database,
) => {
   const {
      services: {
         wateringStationDbService
      }
   } = database;

   return Object.freeze({
      types,
      queries,
      queriesResolver: queriesResolver(wateringStationDbService),
   });
};

const noAuthRequest = [];

export {
   create,
   noAuthRequest,
};