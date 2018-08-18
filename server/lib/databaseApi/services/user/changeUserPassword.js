import { convertOnlyValidationError } from '../../validations/convertValidationError';

/**
 * @public
 * @function updateUser
 * @description update user db interaction
 * @param {object} userModel - the user database model
 * @param {function} findUser - the find user db function
 * @param {id} userId - the user id
 * @param {object} passwordChangeData - the password change data
 * @returns {Promise} of updated user in database
 */
const updateUser = (userModel, findUser) => (userId, passwordChangeData) => {
   const errors = {};
   return findUser(userId)
      .then(user => {
         if (passwordChangeData.password === passwordChangeData.new) {
            errors.new = {
               path: "new",
               message: `The new password must not be the same as the old one.`,
            };
         }

         if (passwordChangeData.new !== passwordChangeData.confirm) {
            errors.confirm = {
               path: "confirm",
               message: `New password is not confirmed.`,
            };
         }

         return user.comparePassword(passwordChangeData.password)
            .catch(error => {
               errors.password = {
                  path: "password",
                  message: error.message,
               };
               return Promise.reject(errors);
            });
      })
      .then(() => {
         if (Object.keys(errors).length === 0) {
            return userModel.findByIdAndUpdate(userId, {
               $set: { password: passwordChangeData.new }
            })
               .catch(error => Promise.reject(error.errors));
         }
         else {
            return Promise.reject(errors);
         }
      })
      .catch(errors => convertOnlyValidationError({
         name: "ValidationError",
         errors
      }));
};

export default updateUser;