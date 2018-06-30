const authenticationError = new Error("You are not authenticated.");

authenticationError.status = 401;

export default authenticationError;