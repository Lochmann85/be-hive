import { createValidationErrorFromErrors } from '../../errorApi';

/**
 * @public
 * @function convertOnlyValidationError
 * @description converts the validation error to a json string
 * @param {object} logger - the logger
 * @returns {Promise} rejected error with json validation message
 */
const convertOnlyValidationError = (error) => {
   if (error.name === "ValidationError" && error.errors) {
      return Promise.reject(createValidationErrorFromErrors(error.errors));
   }
   else {
      return Promise.reject(error);
   }
};

export {
   convertOnlyValidationError,
};