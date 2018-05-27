import React from 'react';

import BaseLayoutLoader from './BaseLayoutLoader';

const QueryLoader = ({ query, children }) => {
   if (query && (query.loading && !query.error)) {
      return <BaseLayoutLoader />;
   }
   else {
      return children;
   }
};

export default QueryLoader;