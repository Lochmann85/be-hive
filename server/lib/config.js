/**
 * @public
 * @function loadConfig
 * @description loads the config from the process
 * @param {object} environment - node environment
 * @returns {object} configuration
 */
const loadConfig = (
   environment = process.env
) => {
   // important notice:
   // For development the port needs to be the same as in the client package.json
   // it starts a proxy server to this port
   const config = Object.assign({}, environment);
   config.isInProductionMode = config.NODE_ENV === "production";
   config.PORT = config.PORT || 3001;
   config.MONGODB_URI = config.MONGODB_URI || "mongodb://be-hive:storage@127.0.0.1:27017/behiveDb";

   return Object.freeze(config);
};

const config = loadConfig();

export {
   loadConfig,
   config
};