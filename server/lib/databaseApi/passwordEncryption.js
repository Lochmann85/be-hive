import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * @public
 * @function continueWithHashedPassword
 * @description hashes the passwor dand continues
 * @param {function} next - next step in pre mongoose middleware
 * @param {object} user - user object
 * @returns {Promise} of hash action
 */
const continueWithHashedPassword = (next, user) => {
   bcrypt.hash(user.password, SALT_ROUNDS)
      .then(hashedPassword => {
         user.password = hashedPassword;
         next();
      }).catch(error => {
         next(error);
      });
};

export {
   continueWithHashedPassword
};