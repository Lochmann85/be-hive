import jwt from 'jsonwebtoken';

/**
 * @public
 * @function create
 * @description creates a jwt token handler
 * @param {String} secret 
 * @param {String} expirationTime 
 */
const create = (
   secret,
   expirationTime,
) => {

   /**
    * @public
    * @function validate
    * @description validates the jwt token
    * @param {string} encryptedJwtToken - the encrypted jwt token
    * @returns {Promise} of decrypted token
    */
   const validate = (encryptedJwtToken) => new Promise((resolve, reject) => {
      jwt.verify(encryptedJwtToken, secret, (error, decodedToken) => {
         if (!error) {
            resolve(decodedToken);
         }
         else {
            reject(new Error("internal server"));
         }
      });
   });

   /**
    * @public
    * @function encrypt
    * @description encrypts the current jwt with the user id
    * @param {object} user - the authenticated user
    * @returns {Promise} of new token
    */
   const encrypt = (user) => new Promise((resolve, reject) => {
      const encryptedData = {
         userId: user.id
      };

      const options = {};
      if (expirationTime) {
         options.expiresIn = expirationTime;
      }

      jwt.sign(encryptedData, secret, options, (error, jwtToken) => {
         if (!error) {
            resolve(jwtToken);
         }
         else {
            reject(new Error("internal server"));
         }
      });
   });

   return Object.freeze({
      validate,
      encrypt,
   });
};

export {
   create
};