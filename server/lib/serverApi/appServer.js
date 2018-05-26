import { config } from '../config';
import * as defaultWebRequestRouterFactory from './webRequestRouter';
import * as defaultWebServerStartupProcess from './webServerStartupProcess';

/**
 * @public
 * @function startupAppServer
 * @description starts up the webserver with graph and other routes
 * @param {object} executableSchema - graphQL executable schema
 * @param {object} webRequestRouterFactory - adds the web request routes
 * @param {object} webServerStartupProcess - initialises and startsup the webserver
 * @returns {Promise} of startup
 */
const startupAppServer = (
   executableSchema,
   webRequestRouterFactory = defaultWebRequestRouterFactory,
   webServerStartupProcess = defaultWebServerStartupProcess,
) => {
   return webRequestRouterFactory.setupWithRoutes(executableSchema, config)
      .then(webRequestRouter => {
         return webServerStartupProcess.initialiseServer(webRequestRouter);
      })
      .then(webServer => {
         return webServerStartupProcess.startupServer(webServer);
      });
};

export {
   startupAppServer,
};