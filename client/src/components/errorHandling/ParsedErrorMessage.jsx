import React from 'react';

import { Message } from 'semantic-ui-react';

const ParsedErrorMessage = ({ graphQLError }) => {
   const parsedError = {
      status: 500,
      errorList: []
   };

   try {
      const parsedErrorResponse = JSON.parse(graphQLError.message);

      parsedError.status = parsedErrorResponse.status;
      parsedError.errorList.push(parsedErrorResponse.message);
   }
   catch (jsonParseError) {
      parsedError.errorList.push({
         message: graphQLError.message,
         path: graphQLError.path,
      });
   }

   return <Message
      header={`Error ${parsedError.status} occured`}
      list={parsedError.errorList.map(error => error.message)} />;
};

export default ParsedErrorMessage;