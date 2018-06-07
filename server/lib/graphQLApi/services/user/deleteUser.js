/**
 * @public
 * @function deleteUser
 * @description deletes a user in the database
 * @param {object} userDbService - the user database service
 * @returns {Promise} of deleted user
 */
const deleteUser = (userDbService) => (_, { userId }) => {
   return userDbService.deleteUser(userId);
};

export default deleteUser;