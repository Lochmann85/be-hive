
/**
 * @public
 * @function convertOnlyValidationError
 * @description converts the validation error to a json string
 * @param {object} logger - the logger
 * @returns {Promise} rejected error with json validation message
 */
const convertOnlyValidationError = (error) => {
   if (error.name === "ValidationError") {
      const validationErrors = error.errors;

      let convertedErrors = [];
      Object.keys(validationErrors).forEach(key => {
         convertedErrors.push({
            path: validationErrors[key].path,
            message: validationErrors[key].message,
         });
      });

      return Promise.reject(new Error(JSON.stringify(convertedErrors)));
   }
   else {
      return Promise.reject(error);
   }
};

export {
   convertOnlyValidationError,
};