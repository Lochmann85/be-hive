import { isEmail } from 'validator';

import { createValidationError } from '../../../errorApi';

/**
 * @public
 * @function authenticateUser
 * @description authenticate user db interaction
 * @param {object} users - the users table
 * @returns {Promise} of user
 */
const authenticateUser = (users) => (credentials) => {
   if (isEmail(credentials.email)) {
      const foundUser = users.find(user => user.email === credentials.email.toLowerCase());

      if (foundUser) {
         return foundUser.comparePassword(credentials.password)
            .catch(error => {
               return Promise.reject(createValidationError(error));
            });
      }
      else {
         return Promise.reject(createValidationError({
            message: "User could not be found.",
            path: "email"
         }));
      }
   }
   else {
      return Promise.reject(createValidationError({
         message: "Please provide a correct E-Mail.",
         path: "email"
      }));
   }
};

export default authenticateUser;