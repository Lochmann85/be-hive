const internalServerError = new Error("Internal Server Error.");

internalServerError.status = 500;

export default internalServerError;