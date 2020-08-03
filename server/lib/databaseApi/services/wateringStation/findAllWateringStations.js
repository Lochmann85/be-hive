/**
 * @public
 * @function findAllWateringStations
 * @description find all watering stations db interaction
 * @param {object} wateringStations - the watering stations table
 * @returns {Promise} of all watering stations
 */
const findAllWateringStations = (wateringStations) => () => {
   return Promise.resolve(wateringStations);
};

export default findAllWateringStations;