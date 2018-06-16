import { isEmail } from 'validator';

/**
 * @public
 * @function authenticateUser
 * @description authenticate user db interaction
 * @param {object} userModel - the user database model
 * @returns {Promise} of user
 */
const authenticateUser = (userModel) => (credentials) => {
   if (isEmail(credentials.email)) {
      return userModel.findOne({ email: credentials.email.toLowerCase() })
         .then(foundUser => {
            if (foundUser) {
               return foundUser;
            }
            else {
               return Promise.reject(new Error(JSON.stringify({
                  message: "User could not be found.",
                  path: "email"
               })));
            }
         })
         .then(knownUser => {
            return knownUser.comparePassword(credentials.password);
         });
   }
   else {
      return Promise.reject(new Error(JSON.stringify({
         message: "Please provide a correct E-Mail.",
         path: "email"
      })));
   }
};

export default authenticateUser;