/**
 * @public
 * @function changeUserPassword
 * @description changes a user password in the database
 * @param {object} userDbService - the user database service
 * @returns {Promise} of changed user password
 */
const changeUserPassword = (userDbService) => (_, { userId, passwordChangeData }) => {
   return userDbService.changeUserPassword(userId, passwordChangeData);
};

export default changeUserPassword;