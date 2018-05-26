const isInProductionMode = process.env.NODE_ENV === "production";

const appIp = isInProductionMode ? process.env.REACT_APP_IP : "localhost";
const appPortSuffix = isInProductionMode ? "" : ":3000";
const appPrefix = isInProductionMode ? "https" : "http";

const httpUri = `${appPrefix}://${appIp}${appPortSuffix}/graphql`;

export {
   httpUri,
};