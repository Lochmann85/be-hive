/**
 * @public
 * @function findAllUsers
 * @description find all users in the database
 * @param {object} userDbService - the user database service
 * @returns {Promise} of all users
 */
const findAllUsers = (userDbService) => () => {
   return userDbService.findAllUsers();
};

export default findAllUsers;