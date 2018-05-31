/**
 * @public
 * @function findUser
 * @description find user db interaction
 * @param {object} userModel - the user database model
 * @returns {Promise} of user
 */
const findUser = (userModel) => (userId) => {
   return userModel.findById(userId)
      .then(user => {
         if (user) {
            return user;
         }
         else {
            return Promise.reject(new Error("User could not be found."));
         }
      });
};

export default findUser;