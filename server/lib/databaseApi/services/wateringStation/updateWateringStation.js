import { convertOnlyValidationError } from '../../validations/convertValidationError';
import { promisifiedValidation } from '../../promisifiedDbValidation';
import { wateringTimesValidation } from '../../validations';

/**
 * @public
 * @function updateWateringStation
 * @description update wateringStation db interaction
 * @param {object} wateringStationModel - the wateringStation database model
 * @param {object} updateWateringStation - the wateringStation input
 * @returns {Promise} of updated wateringStation in database
 */
const updateWateringStation = (wateringStationModel) => (updateWateringStation) => {
   const wateringStation = new wateringStationModel(updateWateringStation.$set); // eslint-disable-line new-cap

   return promisifiedValidation([
      wateringTimesValidation.validate(updateWateringStation.$set.wateringTimes),
      wateringStation.validate()
   ])
      .then(() => {
         return wateringStationModel.findByIdAndUpdate(updateWateringStation.id, updateWateringStation)
            .catch(convertOnlyValidationError);
      });
};

export default updateWateringStation;