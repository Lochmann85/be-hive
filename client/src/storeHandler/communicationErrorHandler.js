import { onError } from 'apollo-link-error';
import { getOperationDefinitionOrDie } from 'apollo-utilities';

import apolloClient from './apolloClient';
import browserHistory from './routerHistory';
import ErrorPage from '../pages/error/ErrorPage';

const AUTHENTICATION_STATUS_ERRNO = 401;

const redirectToErrorPage = (errors) => browserHistory.push(ErrorPage.path, { errors });

const handleError = ({ operation, networkError, graphQLErrors }) => {
   const operationDefinition = getOperationDefinitionOrDie(operation.query);
   if (graphQLErrors && operationDefinition.operation !== "mutation") {
      redirectToErrorPage(graphQLErrors);
   }
   else if (networkError && graphQLErrors) {
      redirectToErrorPage(graphQLErrors);
   }
   else if (networkError) {
      redirectToErrorPage({
         status: networkError.statusCode,
         message: networkError.message
      });
   }
};

const catchErrorHandling = (error) => {
   redirectToErrorPage({
      status: 500,
      message: error.message
   });
};

const errorLink = onError(({ operation, networkError, graphQLErrors }) => {

   if (networkError && networkError.statusCode === AUTHENTICATION_STATUS_ERRNO) {
      localStorage.setItem("jwtToken", null);
      apolloClient.cache.reset()
         .then(() => handleError({ operation, networkError, graphQLErrors }))
         .catch(catchErrorHandling);
   }
   else {
      try {
         handleError({ operation, networkError, graphQLErrors });
      }
      catch (error) {
         catchErrorHandling(error);
      }
   }
});

export {
   errorLink,
   redirectToErrorPage,
};