import browserHistory from '../../storeHandler/routerHistory';

import ErrorPage from '../../pages/error/ErrorPage';

const handleNetworkErrors = (networkError) => {
   browserHistory.push(ErrorPage.path, { errors: networkError });
};

const convertGraphQLErrors = (graphQLErrors, onShowError) => {
   try {
      let shownErrors = [];

      graphQLErrors.forEach(error => {
         const parsedErrorResponse = JSON.parse(error.message);

         if (Array.isArray(parsedErrorResponse)) {
            shownErrors = [...shownErrors, ...parsedErrorResponse];
         }
         else {
            shownErrors.push(parsedErrorResponse);
         }
      });

      onShowError(shownErrors);
   }
   catch (jsonParseError) {
      browserHistory.push(ErrorPage.path, graphQLErrors);
   }
};

const convertOnlyValidationError = (mutationError, onShowError) => {
   if (mutationError.networkError) {
      handleNetworkErrors(mutationError.networkError);
   }
   else if (mutationError.graphQLErrors) {
      convertGraphQLErrors(mutationError.graphQLErrors, onShowError);
   }
};

export {
   handleNetworkErrors,
   convertOnlyValidationError,
};