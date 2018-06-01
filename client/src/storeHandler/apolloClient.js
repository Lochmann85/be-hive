import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { httpUri, } from '../config';
import { errorLink } from './communicationErrorHandler';

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