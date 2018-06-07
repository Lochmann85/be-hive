
/**
 * @public
 * @function deleteUser
 * @description delete user db interaction
 * @param {object} UserModel - the user database model
 * @param {object} userId - the user id to delete
 * @returns {Promise} of deleted user of database
 */
const deleteUser = (UserModel) => (userId) => {
   return UserModel.findByIdAndRemove(userId)
      .then(user => {
         if (!user) {
            return Promise.reject(new Error(`Could not find user to delete`));
         }
         return user;
      });
};

export default deleteUser;