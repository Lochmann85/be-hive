import React from 'react';
import { withApollo, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Menu, Image } from 'semantic-ui-react';

import logo from '../../assets/images/be-hive-logo.svg';
import standardColors from '../../assets/colors/standard.json';

import ControlCenterMenu from './controlCenter/ControlCenterMenu';
import NavigationMenuGroup from './NavigationMenuGroup';
import PrivateRoutes from '../../pages/PrivateRoutes';

import loginMutationTemplate from './graphql/mutations/login';
import checkViewerQueryTemplate from './graphql/queries/checkViewer';
import browserHistory from '../../storeHandler/routerHistory';

const StyledMenu = styled(Menu)`
   margin-left:-0.25rem!important;
   margin-right:-0.25rem!important;
`;

const HeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${standardColors.be_hive_logo_grey};
   vertical-align:middle;
   @media only screen and (max-width: 767px) {
      display: none;
   };
`;

const MobileHeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${standardColors.be_hive_logo_grey};
   vertical-align:middle;
   @media only screen and (min-width: 768px) {
      display: none;
   };
`;

const LogoImage = styled(Image)`
   @media only screen and (max-width: 767px) {
      height:32px;
      width:32px;
   };
   display:inline-block!important;
`;

class Navigation extends React.Component {

   static fragments = {
      viewer: {
         name: "LoginViewer",
         document: gql`
         fragment LoginViewer on Viewer {
            id
            token
            ...${ControlCenterMenu.fragments.viewer.name}
         }
         ${ControlCenterMenu.fragments.viewer.document}`
      }
   }

   render() {
      const {
         checkViewerQuery
      } = this.props;
      const viewer = checkViewerQuery.checkViewer;

      const navigationMenuGroups = PrivateRoutes.navigation.map((menuGroup, index) =>
         <NavigationMenuGroup menuGroup={menuGroup} key={index} />
      );

      return (
         <StyledMenu>
            <Menu.Item header>
               <Link to="/">
                  <LogoImage src={logo} />
                  <HeaderText>Be-Hive</HeaderText>
                  <MobileHeaderText>B-H</MobileHeaderText>
               </Link>
            </Menu.Item>
            <Menu.Menu>
               {navigationMenuGroups}
            </Menu.Menu>
            <Menu.Menu position="right">
               <ControlCenterMenu
                  onLoginSubmit={this._handleLoginSubmit}
                  onLogout={this._handleLogout}
                  viewer={viewer} />
            </Menu.Menu>
         </StyledMenu>
      );
   }

   _handleLoginSubmit = (credentials) => {
      return this.props.login(credentials)
         .then(response => {
            if (response.data.login) {
               const viewer = response.data.login;
               localStorage.setItem("jwtToken", viewer.token);
               return Promise.resolve();
            }
         });
   }

   _handleLogout = () => {
      localStorage.removeItem("jwtToken");
      this.props.client.cache.reset()
         .then(() => {
            browserHistory.push("/");
         });
   }
};

const loginMutation = loginMutationTemplate(Navigation.fragments.viewer);
const checkViewerQuery = checkViewerQueryTemplate(Navigation.fragments.viewer);

export default compose(
   withApollo,
   graphql(checkViewerQuery.document, checkViewerQuery.config),
   graphql(loginMutation.document, loginMutation.config),
)(Navigation);