/**
 * @public
 * @function findUser
 * @description find user in the database
 * @param {object} userDbService - the user database service
 * @returns {Promise} of user
 */
const findUser = (userDbService) => (_, { userId }) => {
   return userDbService.findUser(userId);
};

export default findUser;