import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

class InteractionTableRow extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         mouseIsOver: false,
      };
   }

   render() {
      let ChildElements;

      if (Array.isArray(this.props.children) && this.props.children.length > 0) {
         ChildElements = this.props.children.map((child, index) => {
            const props = {
               key: index
            };

            if (child.type.hasSelectionState) {
               props.isSelected = this.state.mouseIsOver;
            }

            return React.cloneElement(child, props);
         });
      }
      else {
         const props = {};
         if (this.props.children.type.hasSelectionState) {
            props.isSelected = this.state.mouseIsOver;
         }
         ChildElements = React.cloneElement(this.props.children, props);
      }

      return (
         <Table.Row
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}>
            {ChildElements}
         </Table.Row>
      );
   };

   _onMouseEnter = (event) => this.setState({ mouseIsOver: true });

   _onMouseLeave = (event) => this.setState({ mouseIsOver: false });
};

InteractionTableRow.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
   ]).isRequired
};

export default InteractionTableRow;