import createUserTemplate from './createUser';
import updateUserTemplate from './updateUser';
import findAllUsersTemplate from './findAllUsers';
import findUserTemplate from './findUser';

/**
 * @public
 * @function create
 * @description user db service factory
 * @param {object} models - the database models
 * @returns {Promise} of database user service
 */
const create = (
   models,
) => {
   const userDbServices = Object.freeze({
      findAllUsers: findAllUsersTemplate(models.user),
      findUser: findUserTemplate(models.user),
      createUser: createUserTemplate(models.user),
      updateUser: updateUserTemplate(models.user),
   });

   return Object.freeze({
      name: "userDbService",
      services: userDbServices
   });
};

export {
   create,
};