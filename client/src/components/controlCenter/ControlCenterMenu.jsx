import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Dropdown } from 'semantic-ui-react';

import standardColors from '../../assets/colors/standard.json';
import Info from './Info';
import LoginModal from './LoginModal';

const StyledDropdownHeader = styled(Dropdown.Header)`
   margin: 0!important;
   padding:1rem 1.14285714rem!important;
   background-color: ${standardColors.be_hive_yellow};
   opacity: 0.7!important;
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
   min-width: 150px!important;
`;

class ControlCenterMenu extends React.Component {

   static propTypes = {
      onLogout: PropTypes.func.isRequired,
      onLoginSuccess: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         openInfo: false,
         openLogin: false,
      };
   }

   render() {
      let actionButton;
      if (true) {
         actionButton = <Dropdown.Item onClick={this.props.onLogout} content="Logout" />;
      }
      else {
         actionButton = <Dropdown.Item onClick={this._onOpenLogin} content="Login" />;
      }

      return (
         <Dropdown item icon="content">
            <StyledDropdownMenu>
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
                  onLoginSuccess={this._handleLoginSuccess} />
            </StyledDropdownMenu>
         </Dropdown>
      );
   }

   _handleLoginSuccess = (token) => this.setState({ openLogin: false }, this.props.onLoginSuccess(token))

   _onCloseInfo = () => this.setState({ openInfo: false })

   _onOpenInfo = () => this.setState({ openInfo: true })

   _onCloseLogin = () => this.setState({ openLogin: false })

   _onOpenLogin = () => this.setState({ openLogin: true })
}

export default ControlCenterMenu;