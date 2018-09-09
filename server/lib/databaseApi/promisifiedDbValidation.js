import { convertOnlyValidationError } from './validations/convertValidationError';

/**
 * @private
 * @function _toResultObject
 * @description maps the promise to contain the error object or the result
 * @returns {Promise} of mongoose query
 */
const _toResultObject = (promise) => {
   return promise
      .then(result => ({ success: true, result }))
      .catch(error => ({ success: false, error }));
};

/**
 * @public
 * @function promisifiedValidation
 * @description validates the promises using a mapping
 * @param {array} validationPromises - array of promises
 * @returns {Promise} of validation
 */
const promisifiedValidation = (validationPromises) => {
   return Promise.all(validationPromises.map(_toResultObject))
      .then(results => {
         let errors = {},
            hasError = false;
         results.forEach(result => {
            if (!result.success) {
               hasError = true;
               Object.keys(result.error.errors).forEach(key => {
                  errors[key] = result.error.errors[key];
               });
            }
         });

         if (hasError) {
            return convertOnlyValidationError({
               errors,
               name: "ValidationError"
            });
         }
         else {
            return Promise.resolve();
         }
      });
};

export {
   promisifiedValidation
};