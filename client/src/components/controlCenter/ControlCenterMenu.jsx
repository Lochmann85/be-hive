import React from 'react';
import styled from 'styled-components';

import { Dropdown } from 'semantic-ui-react';

import standardColors from '../../assets/colors/standard.json';
import Info from './Info';

const StyledDropdownHeader = styled(Dropdown.Header) `
   margin: 0!important;
   padding:1rem 1.14285714rem!important;
   background-color: ${standardColors.be_hive_yellow};
   opacity: 0.7!important;
`;

const StyledDropdownMenu = styled(Dropdown.Menu) `
   min-width: 150px!important;
`;

class ControlCenterMenu extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         openInfo: false,
      };
   }

   render() {
      return (
         <Dropdown item icon="content">
            <StyledDropdownMenu>
               <StyledDropdownHeader content={"Version"} />
               <Dropdown.Item onClick={this._onInfoClick}>Info</Dropdown.Item>
               <Info
                  open={this.state.openInfo}
                  onCloseClick={this._onCloseClick} />
            </StyledDropdownMenu>
         </Dropdown>
      );
   }

   _onCloseClick = () => this.setState({ openInfo: false })

   _onInfoClick = () => this.setState({ openInfo: true })
}

export default ControlCenterMenu;