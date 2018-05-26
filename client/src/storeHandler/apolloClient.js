import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { httpUri, } from '../config';
import browserHistory from './routerHistory';

const errorLink = onError(({ networkError, graphQLErrors }) => {
   if (graphQLErrors) {
      browserHistory.push("/error", { errors: graphQLErrors });
   }
   else if (networkError) {
      browserHistory.push("/error", { errors: networkError });
   };
});

const httpLink = new HttpLink({
   uri: httpUri
});

const httpLinkWithErrorHandling = ApolloLink.from([
   errorLink,
   httpLink,
]);

const cache = new InMemoryCache({
   dataIdFromObject: object => `${object.__typename}_${object.id}`,
});

const apolloClient = new ApolloClient({
   link: httpLinkWithErrorHandling,
   cache,
});

export default apolloClient;