/**
 * @public
 * @function updateUser
 * @description updates a user in the database
 * @param {object} userDbService - the user database service
 * @returns {Promise} of updated user
 */
const updateUser = (userDbService) => (_, { userId, userData }) => {
   const updateUserData = {
      id: userId,
      $set: {
         name: userData.name
      }
   };
   if (userData.email) {
      updateUserData.$set.email = userData.email.toLowerCase();
   }
   return userDbService.updateUser(userData);
};

export default updateUser;