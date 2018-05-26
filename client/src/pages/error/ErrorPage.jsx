import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Button } from 'semantic-ui-react';

import ParsedErrorMessage from '../../components/errorHandling/ParsedErrorMessage';

const ErrorPage = ({ location: { state } }) => {

   let errorMessage = null;

   const _createErrorMessages = (graphQLError) => {
      return graphQLError.map((error, index) =>
         <ParsedErrorMessage graphQLError={error} key={index} />
      );
   };

   if (state && Array.isArray(state.errors)) {
      errorMessage = _createErrorMessages(state.errors);
   }
   else {
      errorMessage = _createErrorMessages([{
         message: "Oooops something bad happened!"
      }]);
   }

   return (
      <Grid padded>
         <Grid.Row>
            <Grid.Column mobile={1} tablet={1} computer={3} largeScreen={4} widescreen={4} />
            <Grid.Column mobile={14} tablet={14} computer={8} largeScreen={7} widescreen={6}>
               {errorMessage}
               <Button as={Link} to="/" content="Home" />
            </Grid.Column>
         </Grid.Row>
      </Grid>
   );
};

ErrorPage.path = "/error";

export default ErrorPage;