
/**
 * @public
 * @function formatError
 * @description formats the graphQL error to contain message and status
 * @param {object} error - the error
 * @returns {object} graphQL error response
 */
export default (error) => ({ message: error.message, status: error.status || 500 });
