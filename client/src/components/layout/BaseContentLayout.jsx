import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid, Header } from 'semantic-ui-react';

import { NoSideMarginGrid } from '../../assets/styles/UI';

const ContentColumn = styled.div`
	margin: 0px 10px;
`;

const PaddedRow = styled(Grid.Row)`
   @media only screen and (min-width: 768px) {
      padding-left: 2rem!important;
      padding-right: 2rem!important;
   };
`;

const BaseContentLayout = ({ title, children }) => {
   let titleRow;
   if (title) {
      titleRow = (
         <PaddedRow>
            <Grid.Column>
               <Header as="h1">{title}</Header>
            </Grid.Column>
         </PaddedRow>
      );
   }

   return (
      <NoSideMarginGrid>
         {titleRow}
         <PaddedRow>
            <Grid.Column>
               <ContentColumn>
                  {children}
               </ContentColumn>
            </Grid.Column>
         </PaddedRow>
      </NoSideMarginGrid>
   );
};

BaseContentLayout.propTypes = {
   title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
   ]),
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
   ]).isRequired
};

export default BaseContentLayout;
