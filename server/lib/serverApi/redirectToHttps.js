import herokuSslRedirect from 'heroku-ssl-redirect';

import defaultIsArduinoRequest from '../arduinoApi/isArduinoRequest';

/**
 * @public
 * @function redirectToHttps
 * @description redirects all requests to https besides those for he arduino 
 * @param {function} isArduinoRequest - checks if the request belongs to the arduino
 * @param {function} herokuRedirect - the heroku redirect function
 * @returns {function} for redirecting to https
 */
const redirectToHttps = ({
   isArduinoRequest = defaultIsArduinoRequest,
   herokuRedirect = herokuSslRedirect
}) => {
   const redirect = herokuRedirect();

   return (request, response, next) => {
      if (isArduinoRequest(request)) {
         next();
      }
      else {
         return redirect(request, response, next);
      }
   };
};

export {
   redirectToHttps
};