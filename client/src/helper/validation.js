
/**
 * @public
 * @function checkForErrorInInput
 * @description Checks for an error path inside of the errors array
 * if found the related input has an error
 * @param {string} path - the input path
 * @param {array} errors - All errors.
 * @returns {boolean} true when error has been found
 */
const checkForErrorInInput = (path, errors) => {
   return errors.findIndex(error => error.path === path) > -1;
};

export default checkForErrorInInput;