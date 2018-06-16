/**
 * @public
 * @function login
 * @description login to the app
 * @param {object} userDbService - the user database service
 * @returns {Promise} of logged in user
 */
const login = (userDbService) => (_, { credentials }, { tokenHandler }) => {
   return userDbService.authenticateUser(credentials)
      .then(user => {
         return tokenHandler.encrypt(user)
            .then(token => {
               user.token = token;
               return user;
            });
      });
};

export default login;