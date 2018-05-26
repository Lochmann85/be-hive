import http from 'http';

import { config } from '../config';

/**
 * @public
 * @function initialiseServer
 * @description initialises the http webserver
 * @param {object} webRequestRouter - web request routes
 * @param {function} createServer - creates the server
 * @returns {Promise} of http web server
 */
const initialiseServer = (
   webRequestRouter,
   createServer = http.createServer,
) => {
   return Promise.resolve(createServer(webRequestRouter));
};

/**
 * @public
 * @function startupServer
 * @description initialises the http webserver
 * @param {object} webServer - web server
 * @param {function} ioOperationHandler - the I/O operation handler used for waiting until all operations are done
 * @param {object} nodeProcess - the node process
 * @param {object} logger - the logger
 * @returns {Promise} of http web server
 */
const startupServer = (
   webServer,
   ioOperationHandler = setImmediate,
   nodeProcess = process,
   logger = console,
) => {
   return new Promise((resolve, reject) => {
      let hasStartupError = false,
         startUpFinished = false;

      webServer.on("error", error => {
         // exit after finishing all I/O operations
         ioOperationHandler(() => nodeProcess.exit(1));

         if (!startUpFinished) {
            hasStartupError = true;
            reject(error);
         }
      });

      webServer.listen(config.PORT, () => {
         logger.log(`GraphQL serves on http://127.0.0.1:${config.PORT}/graphql`);

         if (!hasStartupError) {
            startUpFinished = true;
            resolve();
         }
      });
   });
};

export {
   initialiseServer,
   startupServer,
};