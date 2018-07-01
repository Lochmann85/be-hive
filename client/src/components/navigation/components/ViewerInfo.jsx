import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import { Icon, Button } from 'semantic-ui-react';

import {
   TextEllipsisWrapper,
   FlexWrapper
} from '../../../assets/styles/Wrapper';

import UserRoutes from '../../../pages/user/Routes';

const ViewerInfoWrapper = styled(FlexWrapper)`
   width: 250px;
   margin: 15px 0;
   align-items: stretch;
`;
const ViewerInfoDataWrapper = styled(FlexWrapper)`
   flex-direction: column;
   width: 60%;
   justify-content: space-between;
   align-items: flex-start;
   padding-left: 1.14285714rem;
`;
const ViewerIcon = styled(Icon)`
   line-height: 1;
   align-self: center;
   font-size: 5em!important;
   padding-left: 1.14285714rem;
`;
const UserNameHeader = styled(TextEllipsisWrapper)`
   width:100%;
   font-weight: 600;
   line-height: 1.15em;
   font-size: 1.15em;
`;

const ViewerInfo = ({ viewer }) => {

   let headerText,
      profileButton = null;

   if (viewer) {
      headerText = viewer.name;
      profileButton = <Button basic as={Link} to={
         `${UserRoutes.relatedPaths.updateUser}/${viewer.id}`
      }>Profile</Button>;
   }
   else {
      headerText = "Guest";
   }

   return (
      <ViewerInfoWrapper>
         <ViewerIcon className="ficon-user-circle-o" />
         <ViewerInfoDataWrapper>
            <UserNameHeader>
               {headerText}
            </UserNameHeader>
            {profileButton}
         </ViewerInfoDataWrapper>
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