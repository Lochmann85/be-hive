import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid, Header } from 'semantic-ui-react';

const ContentColumn = styled.div`
	margin: 0px 10px;
`;
const PaddedRow = styled(Grid.Row) `
   padding-left: 2rem!important;
   padding-right: 2rem!important;
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
      <Grid>
         {titleRow}
         <PaddedRow>
            <Grid.Column>
               <ContentColumn>
                  {children}
               </ContentColumn>
            </Grid.Column>
         </PaddedRow>
      </Grid>
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
