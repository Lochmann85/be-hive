/**
 * @public
 * @function createUser
 * @description creates a new user in the database
 * @param {object} userDbService - the user database service
 * @returns {Promise} of new user
 */
const createUser = (userDbService) => (_, { userData }) => {
   return userDbService.createUser(userData);
};

export default createUser;