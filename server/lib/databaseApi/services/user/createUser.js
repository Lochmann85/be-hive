import { convertSingleDataFromDbResponse } from '../dbServiceHelper';

/**
 * @public
 * @function createUser
 * @description create user db interaction
 * @param {object} userModel - the user database model
 * @param {object} userData - the user input
 * @returns {Promise} of new user in database
 */
const createUser = (userModel) => (userData) => {
   const newUser = userModel.build(userData);

   return newUser.save().then(convertSingleDataFromDbResponse);
};

export default createUser;