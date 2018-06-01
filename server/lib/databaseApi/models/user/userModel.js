import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import {
   emailValidation,
   passwordValidation
} from '../../validations';

import { continueWithHashedPassword } from '../../passwordEncryption';

/**
 * @public
 * @function create
 * @description user schema factory
 * @param {object} dbConnection - the connection to the database
 * @returns {Promise} of database user model
 */
const create = (
   dbConnection
) => {
   const userSchema = new mongoose.Schema({
      email: {
         type: String,
         required: true,
         unique: true,
         validate: emailValidation
      },
      name: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
         validate: passwordValidation,
      },
      isDeletable: {
         type: Boolean,
         isRequired: true,
         default: true,
      }
   }, { timestamps: true });

   const duplicateErrorMessage = "There already exists a user with the given {PATH}.";

   userSchema.plugin(uniqueValidator, { message: duplicateErrorMessage });

   /**
    * @public
    * @function saveWithHashedPassword
    * @param {object} userData - the new user data
    * @description hashes the password of each new user
    */
   userSchema.methods.saveWithHashedPassword = function () {
      return new Promise((resolve, reject) => {
         continueWithHashedPassword(error => {
            if (error) {
               reject(error);
            }
            else {
               this.save()
                  .then(resolve)
                  .catch(reject);
            }
         }, this);
      });
   };

   /**
    * @private
    * @function pre("findOneAndUpdate")
    * @description pre findOneAndUpdate middleware, states that the returned user is the new one
    */
   userSchema.pre("findOneAndUpdate", function (next) {
      this.options.new = true;
      this.options.context = "query";

      let update = this.getUpdate();
      if (update["$set"] && update["$set"].hasOwnProperty("password")) {
         if (passwordValidation.validator(update["$set"].password)) {
            continueWithHashedPassword(next, update["$set"]);
         }
         else {
            next({
               errors: {
                  new: {
                     message: passwordValidation.message,
                     path: "new",
                  }
               }
            });
         }
      }
      else {
         this.options.runValidators = true;
         return next();
      }
   });

   /**
    * @public
    * @function comparePassword
    * @description compares the given password with the password from the database
    * @param {string} password - password of user
    * @returns {Promise} of user
    */
   userSchema.methods.comparePassword = function (password) {
      return bcrypt.compare(password, this.password)
         .then(isMatch => {
            if (isMatch) {
               return this;
            }
            else {
               return Promise.reject(new Error("Please provide the correct password."));
            }
         });
   };

   return Object.freeze({
      name: "user",
      schema: dbConnection.model("User", userSchema),
   });
};

export {
   create
};