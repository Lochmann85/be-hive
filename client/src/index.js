import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';

import { Router } from 'react-router-dom';

import apolloClient from './storeHandler/apolloClient';
import browserHistory from './storeHandler/routerHistory';
import App from './App';

ReactDOM.render((
   <ApolloProvider client={apolloClient}>
      <Router history={browserHistory}>
         <App />
      </Router>
   </ApolloProvider>
), document.getElementById("root"));
