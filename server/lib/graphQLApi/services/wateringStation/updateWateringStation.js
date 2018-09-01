import mapWateringStation from './mapWateringStation';

/**
 * @public
 * @function updateWateringStation
 * @description updates a wateringStation in the database
 * @param {object} wateringStationDbService - the wateringStation database service
 * @returns {Promise} of updated wateringStation
 */
const updateWateringStation = (wateringStationDbService) => (_, { wateringStationId, wateringStationData }) => {
   const updateWateringStationData = {
      id: wateringStationId,
      $set: {
         name: wateringStationData.name,
         description: wateringStationData.description,
         isActive: wateringStationData.isActive,
         wateringTimes: wateringStationData.wateringTimes,
      }
   };

   return wateringStationDbService.updateWateringStation(updateWateringStationData)
      .then(wateringStation => mapWateringStation(wateringStation));
};

export default updateWateringStation;