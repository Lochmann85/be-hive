import express from 'express';
import herokuSslRedirect from 'heroku-ssl-redirect';
import {
   graphqlExpress,
   graphiqlExpress
} from 'graphql-server-express';
import defaultBodyParser from 'body-parser';
import path from 'path';

import respondWithError from './respondWithError';
import * as defaultArduinoRoutes from '../arduinoApi/arduinoRoutes';
import formatError from '../errorApi/formatError';

const reactAppDirectory = path.join(__dirname, "..", "..", "..", "client", "build");

/**
 * @public
 * @function setupWithRoutes
 * @description sets up the different routes for the web server
 * @param {object} executableSchema - graphQL executable schema
 * @param {object} config - the app config
 * @param {object} authenticationMiddlewares - authentication middlewares
 * @param {object} arduinoRoutes - the routes for the arduino
 * @param {object} routerDriver - router driver default express
 * @param {object} graphQLRouterDriver - router driver for the graphQL request handling
 * @param {object} bodyParser - request body parser
 * @returns {Promise} of web request router
 */
const setupWithRoutes = (
   executableSchema,
   config,
   authenticationMiddlewares,
   arduinoRoutes = defaultArduinoRoutes,
   routerDriver = express,
   graphQLRouterDriver = graphqlExpress,
   bodyParser = defaultBodyParser,
) => {

   const { graphQLAuthenticationMiddleware } = authenticationMiddlewares;

   const webRequestRouter = routerDriver();

   // redirect to https for heroku platform
   webRequestRouter.use(herokuSslRedirect());

   webRequestRouter.use("/graphql",
      bodyParser.json(),
      bodyParser.urlencoded({
         extended: false
      }),
      graphQLAuthenticationMiddleware,
      graphQLRouterDriver(request => ({
         schema: executableSchema,
         context: {
            tokenHandler: request.headers.tokenHandler,
            viewer: request.headers.viewer,
         },
         formatError,
      })),
      (error, request, response, next) => {
         if (error) {
            respondWithError(error, response, next);
         }
         else {
            next();
         }
      }
   );

   arduinoRoutes.useIn(webRequestRouter);

   // request router only serves static assets in production
   if (config.isInProductionMode) {
      webRequestRouter.use(routerDriver.static(reactAppDirectory));

      // fallback route for refreshing page
      webRequestRouter.get("/*", (request, response) => {
         switch (request.path) {
            case "/graphql":
               break;
            default:
               response.sendFile(path.join(reactAppDirectory, "index.html"));
               break;
         }
      });
   }
   else {
      const mockedTokenHandler = {
         validate() { return Promise.resolve(true); },
         encrypt() { return Promise.resolve(1); }
      };

      webRequestRouter.use(
         "/graphql_dev",
         bodyParser.json(),
         graphQLRouterDriver(() => ({
            schema: executableSchema,
            context: {
               tokenHandler: mockedTokenHandler,
            },
         }))
      );

      webRequestRouter.use("/graphiql", graphiqlExpress({
         endpointURL: "/graphql_dev",
      }));
   }

   return Promise.resolve(webRequestRouter);
};

export {
   setupWithRoutes,
   reactAppDirectory,
};