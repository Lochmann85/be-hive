import findAllWateringStationsTemplate from './findAllWateringStations';
import findWateringStationTemplate from './findWateringStation';
import updateWateringStationTemplate from './updateWateringStation';

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
input WateringTimeData {
   time: String
   duration: Int
}
input WateringStationData {
   name: String
   description: String
   isActive: Boolean
   wateringTimes: [WateringTimeData]
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

const mutations = `
   updateWateringStation(wateringStationId: ID, wateringStationData:  WateringStationData): WateringStation!
`;

const mutationsResolver = (wateringStationDbService) => ({
   updateWateringStation: updateWateringStationTemplate(wateringStationDbService),
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
      mutations,
      mutationsResolver: mutationsResolver(wateringStationDbService),
   });
};

const noAuthRequest = [];

export {
   create,
   noAuthRequest,
};