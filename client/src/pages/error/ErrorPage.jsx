import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Button } from 'semantic-ui-react';

import ParsedErrorMessage from '../../components/errorHandling/ParsedErrorMessage';
import PrivateRoutes from '../PrivateRoutes';
import BaseContentLayout from '../../components/layout/BaseContentLayout';
import { ButtonGroupWrapper } from '../../assets/styles/Wrapper';

const ErrorPage = ({ location: { state } }) => {

   let errorMessage = null;

   const _createErrorMessages = (errors) => {
      return errors.map((error, index) =>
         <ParsedErrorMessage error={error} key={index} />
      );
   };

   if (state && state.errors && Array.isArray(state.errors)) {
      errorMessage = _createErrorMessages(state.errors);
   }
   else if (state) {
      errorMessage = <ParsedErrorMessage error={state} />;
   }
   else {
      errorMessage = _createErrorMessages([{
         message: "Oooops something bad happened!"
      }]);
   }

   return (
      <BaseContentLayout>
         <Grid>
            <Grid.Row>
               <Grid.Column only="tablet" tablet={1} computer={2} largeScreen={4} widescreen={4} />
               <Grid.Column mobile={16} tablet={14} computer={12} largeScreen={8} widescreen={8} >
                  {errorMessage}
               </Grid.Column>
            </Grid.Row>
         </Grid>
         <ButtonGroupWrapper>
            <Button as={Link} to={PrivateRoutes.path} content="Home" />
         </ButtonGroupWrapper>
      </BaseContentLayout >
   );
};

ErrorPage.path = "/error";

export default ErrorPage;