import { convertOnlyValidationError } from '../../validations/convertValidationError';

/**
 * @public
 * @function updateWateringStation
 * @description update wateringStation db interaction
 * @param {object} wateringStationModel - the wateringStation database model
 * @param {object} updateWateringStation - the wateringStation input
 * @returns {Promise} of updated wateringStation in database
 */
const updateWateringStation = (wateringStationModel) => (updateWateringStation) => {
   return wateringStationModel.findByIdAndUpdate(updateWateringStation.id, updateWateringStation)
      .catch(convertOnlyValidationError);
};

export default updateWateringStation;