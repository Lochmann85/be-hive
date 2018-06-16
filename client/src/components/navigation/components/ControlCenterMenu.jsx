import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Dropdown } from 'semantic-ui-react';

import standardColors from '../../../assets/colors/standard.json';
import Info from './Info';
import LoginModal from './LoginModal';
import ViewerInfo from './ViewerInfo';

const StyledDropdownHeader = styled(Dropdown.Header)`
   margin: 0!important;
   padding:1rem 1.14285714rem!important;
   background-color: ${standardColors.be_hive_yellow};
   opacity: 0.7!important;
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
   min-width: 150px!important;
`;

const viewerFragment = {
   name: "ControlCenterViewer",
   document: gql`
   fragment ControlCenterViewer on Viewer {
      ...${ViewerInfo.fragments.viewer.name}
   }
   ${ViewerInfo.fragments.viewer.document}`
};

class ControlCenterMenu extends React.Component {

   static fragments = {
      viewer: viewerFragment
   };

   static propTypes = {
      onLogout: PropTypes.func.isRequired,
      onLoginSubmit: PropTypes.func.isRequired,
      viewer: propType(viewerFragment.document),
   }

   constructor(props) {
      super(props);

      this.state = {
         openInfo: false,
         openLogin: false,
      };
   }

   render() {
      const {
         onLogout,
         onLoginSubmit,
         viewer
      } = this.props;

      let actionButton;
      if (viewer) {
         actionButton = <Dropdown.Item onClick={onLogout} content="Logout" />;
      }
      else {
         actionButton = <Dropdown.Item onClick={this._onOpenLogin} content="Login" />;
      }

      return (
         <Dropdown item icon="content">
            <StyledDropdownMenu>
               <ViewerInfo viewer={viewer} />
               <StyledDropdownHeader content={"Version"} />
               <Dropdown.Item onClick={this._onOpenInfo}>Info</Dropdown.Item>
               <Info
                  open={this.state.openInfo}
                  onCloseClick={this._onCloseInfo} />
               <StyledDropdownHeader content={"Action"} />
               {actionButton}
               <LoginModal
                  open={this.state.openLogin}
                  onCloseClick={this._onCloseLogin}
                  onLoginSubmit={onLoginSubmit} />
            </StyledDropdownMenu>
         </Dropdown>
      );
   }

   _onCloseInfo = () => this.setState({ openInfo: false })

   _onOpenInfo = () => this.setState({ openInfo: true })

   _onCloseLogin = () => this.setState({ openLogin: false })

   _onOpenLogin = () => this.setState({ openLogin: true })
}

export default ControlCenterMenu;