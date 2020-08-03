/**
 * @public
 * @function findAllUsers
 * @description find all users db interaction
 * @param {object} users - the users table
 * @returns {Promise} of all users
 */
const findAllUsers = (users) => () => {
   return Promise.resolve(users);
};

export default findAllUsers;