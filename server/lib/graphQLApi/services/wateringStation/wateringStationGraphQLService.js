import findAllWateringStationsTemplate from './findAllWateringStations';

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
`;

const queriesResolver = (wateringStationDbService) => ({
   findAllWateringStations: findAllWateringStationsTemplate(wateringStationDbService),
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