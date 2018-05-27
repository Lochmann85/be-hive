import createUserTemplate from './createUser';
import findAllUsersTemplate from './findAllUsers';

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
      createUser: createUserTemplate(models.user)
   });

   return Object.freeze({
      name: "userDbService",
      services: userDbServices
   });
};

export {
   create,
};