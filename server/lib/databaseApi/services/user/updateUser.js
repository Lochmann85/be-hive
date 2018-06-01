import { convertOnlyValidationError } from '../../validations/convertValidationError';

/**
 * @public
 * @function updateUser
 * @description update user db interaction
 * @param {object} UserModel - the user database model
 * @param {object} updateUser - the user input
 * @returns {Promise} of updated user in database
 */
const updateUser = (UserModel) => (updateUser) => {
   return UserModel.findByIdAndUpdate(updateUser.id, updateUser)
      .catch(convertOnlyValidationError);
};

export default updateUser;