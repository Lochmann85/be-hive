/**
 * @public
 * @function findAllWateringStations
 * @description find all watering stations db interaction
 * @param {object} wateringStationModel - the watering station database model
 * @returns {Promise} of all watering stations
 */
const findAllWateringStations = (wateringStationModel) => () => {
   return wateringStationModel.find().sort({ index: 1 });
};

export default findAllWateringStations;