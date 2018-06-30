import browserHistory from '../../storeHandler/routerHistory';

import ErrorPage from '../../pages/error/ErrorPage';

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
   if (mutationError.graphQLErrors &&
      Array.isArray(mutationError.graphQLErrors) &&
      mutationError.graphQLErrors.length > 0
   ) {
      convertGraphQLErrors(mutationError.graphQLErrors, onShowError);
   }
};

export {
   convertOnlyValidationError,
};