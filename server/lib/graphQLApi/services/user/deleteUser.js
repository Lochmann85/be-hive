/**
 * @public
 * @function deleteUser
 * @description deletes a user in the database
 * @param {object} userDbService - the user database service
 * @returns {Promise} of deleted user
 */
const deleteUser = (userDbService) => (_, { userId }, { viewer }) => {
   if (viewer.id !== userId) {
      return userDbService.findUser(userId)
         .then(user => {
            if (user.isDeletable) {
               return userDbService.deleteUser(userId);
            }
            else {
               return Promise.reject(new Error(JSON.stringify({
                  message: "This user cannot be deleted.",
               })));
            }
         });
   }
   else {
      return Promise.reject(new Error(JSON.stringify({
         message: "You cannot delete yourself.",
      })));
   }
};

export default deleteUser;