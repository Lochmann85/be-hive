/**
 * @public
 * @function findAllUsers
 * @description find all users db interaction
 * @param {object} userModel - the user database model
 * @returns {Promise} of all users
 */
const findAllUsers = (userModel) => () => {
   return userModel.find();
};

export default findAllUsers;