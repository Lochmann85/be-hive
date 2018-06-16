import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import { Grid, Icon, Button, Header } from 'semantic-ui-react';

import UserRoutes from '../../../pages/user/Routes';

const ViewerInfoWrapper = styled.div`
   width: 250px;
   margin: 15px 5px;
`;
const ViewerInfoGrid = styled(Grid)`
   & > .row {
      padding-top:0.75rem!important;
      padding-bottom:0.75rem!important;
   }
`;
const ViewerIcon = styled(Icon)`
   line-height: 1;
   vertical-align: middle;
   font-size: 6em!important;
`;

const ViewerInfo = ({ viewer }) => {

   let header,
      profileButton = null;

   if (viewer) {
      header = <Header>
         {viewer.name}
      </Header>;
      profileButton = <Button basic as={Link} to={
         `${UserRoutes.relatedPaths.updateUser}/${viewer.id}`
      }>Profile</Button>;
   }
   else {
      header = <Header>
         {"Guest"}
      </Header>;
   }

   return (
      <ViewerInfoWrapper>
         <Grid>
            <Grid.Row>
               <Grid.Column width={6} verticalAlign="middle">
                  <ViewerIcon className="ficon-user-circle-o" />
               </Grid.Column>
               <Grid.Column width={10}>
                  <ViewerInfoGrid>
                     <Grid.Row>
                        <Grid.Column>
                           {header}
                        </Grid.Column>
                     </Grid.Row>
                     <Grid.Row>
                        <Grid.Column>
                           {profileButton}
                        </Grid.Column>
                     </Grid.Row>
                  </ViewerInfoGrid>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </ViewerInfoWrapper>
   );
};

const viewerFragment = {
   name: "ViewerInfoViewer",
   document: gql`
   fragment ViewerInfoViewer on Viewer {
      id
      name
   }`
};

ViewerInfo.fragments = {
   viewer: viewerFragment,
};

ViewerInfo.propTypes = {
   viewer: propType(viewerFragment.document)
};

export default ViewerInfo;