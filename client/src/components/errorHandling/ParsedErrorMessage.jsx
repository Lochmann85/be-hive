import React from 'react';
import styled from 'styled-components';

import { Header, List } from 'semantic-ui-react';

const StyledErrorList = styled(List)`
   margin-left: 2rem!important;
   margin-right: 2rem!important;
   margin-bottom: 2rem!important;
`;

const ParsedErrorMessage = ({ error }) => {
   const parsedError = {
      status: error.status || 500,
      errorList: [{ message: error.message || "Oooops something bad happened!" }]
   };

   const listItems = parsedError.errorList.map((error, index) =>
      <List.Item key={index} content={error.message} />
   );

   return (
      <React.Fragment>
         <Header as="h2" content={`Error ${parsedError.status} occured`} />
         <StyledErrorList bulleted>
            {listItems}
         </StyledErrorList>
      </React.Fragment>
   );
};

export default ParsedErrorMessage;