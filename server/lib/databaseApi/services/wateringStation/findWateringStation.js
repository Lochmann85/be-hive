/**
 * @public
 * @function findWateringStation
 * @description find watering station db interaction
 * @param {object} wateringStationModel - the watering station database model
 * @returns {Promise} of watering station
 */
const findWateringStation = (wateringStationModel) => (wateringStationId) => {
   return wateringStationModel.findById(wateringStationId)
      .then(wateringStation => {
         if (wateringStation) {
            return wateringStation;
         }
         else {
            return Promise.reject(new Error("Watering station could not be found."));
         }
      });
};

export default findWateringStation;