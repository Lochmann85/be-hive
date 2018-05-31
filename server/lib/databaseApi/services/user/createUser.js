/**
 * @public
 * @function createUser
 * @description create user db interaction
 * @param {object} UserModel - the user database model
 * @param {object} userData - the user input
 * @returns {Promise} of new user in database
 */
const createUser = (UserModel) => (userData) => {
   const user = new UserModel(userData);

   return user.validate()
      .then(() => {
         return user.saveWithHashedPassword();
      });
};

export default createUser;