import { onError } from 'apollo-link-error';
import { getOperationDefinitionOrDie } from 'apollo-utilities';

import browserHistory from './routerHistory';
import ErrorPage from '../pages/error/ErrorPage';

const redirectToErrorPage = (errors) => browserHistory.push(ErrorPage.path, { errors });

const redirectToLoginPage = () => browserHistory.push("/login");

const errorLink = onError(({ operation, networkError, graphQLErrors }) => {
   try {
      const operationDefinition = getOperationDefinitionOrDie(operation.query);

      if (graphQLErrors && operationDefinition.operation !== "mutation") {
         let hasUnauthorized = false;
         graphQLErrors.forEach(error => {
            if (error.name === "Unauthorized") {
               hasUnauthorized = true;
            }
         });

         if (hasUnauthorized) {
            redirectToLoginPage();
         }
         else {
            redirectToErrorPage(graphQLErrors);
         }
      }
      else if (networkError) {
         redirectToErrorPage({
            status: networkError.statusCode,
            message: networkError.message
         });
      }
   } catch (error) {
      redirectToErrorPage({
         status: 500,
         message: error.message
      });
   }
});

export {
   errorLink,
   redirectToErrorPage,
   redirectToLoginPage
};