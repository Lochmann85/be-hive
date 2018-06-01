import express from 'express';
import herokuSslRedirect from 'heroku-ssl-redirect';
import {
   graphqlExpress,
   graphiqlExpress
} from 'graphql-server-express';
import defaultBodyParser from 'body-parser';
import path from 'path';

const reactAppDirectory = path.join(__dirname, "..", "..", "..", "client", "build");

/**
 * @public
 * @function setupWithRoutes
 * @description sets up the different routes for the web server
 * @param {object} executableSchema - graphQL executable schema
 * @param {object} config - the app config
 * @param {object} routerDriver - router driver default express
 * @param {object} graphQLRouterDriver - router driver for the graphQL request handling
 * @param {object} bodyParser - request body parser
 * @returns {Promise} of web request router
 */
const setupWithRoutes = (
   executableSchema,
   config,
   routerDriver = express,
   graphQLRouterDriver = graphqlExpress,
   bodyParser = defaultBodyParser,
) => {

   const webRequestRouter = routerDriver();

   // redirect to https for heroku platform
   webRequestRouter.use(herokuSslRedirect());

   webRequestRouter.use("/graphql",
      bodyParser.json(),
      bodyParser.urlencoded({
         extended: false
      }),
      graphQLRouterDriver(request => ({
         schema: executableSchema
      })),
   );

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
   } else {
      webRequestRouter.use(
         "/graphql_dev",
         bodyParser.json(),
         graphQLRouterDriver(request => ({
            schema: executableSchema
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