import React from 'react';
import { withApollo, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Menu, Image } from 'semantic-ui-react';

import logo from '../../assets/images/be-hive-logo.svg';
import standardColors from '../../assets/colors/standard.json';

import ControlCenterMenu from './components/ControlCenterMenu';
import NavigationMenuGroup from './NavigationMenuGroup';
import PrivateRoutes from '../../pages/PrivateRoutes';

import loginMutationTemplate from './graphql/mutations/login';
import browserHistory from '../../storeHandler/routerHistory';

const StyledMenu = styled(Menu)`
   border-radius: 0!important;
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
         name: "NavigationViewer",
         document: gql`
         fragment NavigationViewer on Viewer {
            id
            token
            ...${ControlCenterMenu.fragments.viewer.name}
         }
         ${ControlCenterMenu.fragments.viewer.document}`
      }
   }

   render() {
      const {
         viewer
      } = this.props;

      let navigationMenuGroups;
      if (viewer) {
         localStorage.setItem("jwtToken", viewer.token);

         navigationMenuGroups = PrivateRoutes.navigation.map((menuGroup, index) =>
            <NavigationMenuGroup menuGroup={menuGroup} key={index} />
         );
      }

      return (
         <StyledMenu>
            <Menu.Item header>
               <Link to={PrivateRoutes.path}>
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
            browserHistory.push(PrivateRoutes.path);
         });
   }
};

const loginMutation = loginMutationTemplate(Navigation.fragments.viewer);

export default compose(
   withApollo,
   graphql(loginMutation.document, loginMutation.config),
)(Navigation);