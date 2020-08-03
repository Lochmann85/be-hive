/**
 * @public
 * @function findUser
 * @description find user db interaction
 * @param {object} users - the users table
 * @returns {Promise} of user
 */
const findUser = (users) => (userId) => {
   const user = users.find(user => user.id === userId);

   if (user) {
      return user;
   }
   else {
      return Promise.reject(new Error("User could not be found."));
   }
};

export default findUser;