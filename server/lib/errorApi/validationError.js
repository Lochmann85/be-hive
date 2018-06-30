/**
 * @public
 * @function createValidationError
 * @description creates a new validation error
 * @param {string} message - the basic error message
 * @param {string} path - the path to the validated property
 * @returns {object} error
 */
const createValidationError = ({ message, path }) => {
   return new Error(JSON.stringify({
      message,
      path,
   }));
};

/**
 * @public
 * @function createValidationErrorFromErrors
 * @description creates a new validation error from an array of errors
 * @param {array} errors - errors array from basic api
 * @returns {object} error
 */
const createValidationErrorFromErrors = (errors) => {

   let convertedErrors = [];
   Object.keys(errors).forEach(key => {
      convertedErrors.push({
         message: errors[key].message,
         path: errors[key].path,
      });
   });

   return new Error(JSON.stringify(convertedErrors));
};

export {
   createValidationError,
   createValidationErrorFromErrors
};