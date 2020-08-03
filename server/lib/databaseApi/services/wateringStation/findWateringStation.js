/**
 * @public
 * @function findWateringStation
 * @description find watering station db interaction
 * @param {object} wateringStations - the watering stations table
 * @returns {Promise} of watering station
 */
const findWateringStation = (wateringStations) => (wateringStationId) => {
   const wateringStation = wateringStations.find(wateringStation => wateringStation.id === wateringStationId);

   if (wateringStation) {
      return wateringStation;
   }
   else {
      return Promise.reject(new Error("Watering station could not be found."));
   }
};

export default findWateringStation;