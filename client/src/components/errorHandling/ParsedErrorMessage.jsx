import React from 'react';

import { Message } from 'semantic-ui-react';

const ParsedErrorMessage = ({ error }) => {
   const parsedError = {
      status: error.status || 500,
      errorList: [{ message: error.message || "Oooops something bad happened!" }]
   };

   return <Message
      header={`Error ${parsedError.status} occured`}
      list={parsedError.errorList.map(error => error.message)} />;
};

export default ParsedErrorMessage;