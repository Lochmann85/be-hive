const forbiddenError = new Error("You are not allowed to perform this action.");

forbiddenError.status = 403;

export default forbiddenError;