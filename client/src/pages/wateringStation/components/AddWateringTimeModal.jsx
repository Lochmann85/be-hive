import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'semantic-ui-react';

import { BeHiveButton } from '../../../assets/styles/UI';

class AddWateringTimeModal extends React.Component {

   render() {
      const {
         onCloseClick,
         open
      } = this.props;

      return (
         <Modal open={open} size="small">
            <Modal.Header content="Add watering time" />
            <Modal.Content>
            </Modal.Content>
            <Modal.Actions>
               <Button content="Close" onClick={onCloseClick} />
               <BeHiveButton
                  content="Add"
                  onClick={this._onAddWateringTimeClick} />
            </Modal.Actions>
         </Modal>
      );
   }

   _onAddWateringTimeClick = () => {
      this.props.onAddWateringTime();
   };

};

AddWateringTimeModal.propTypes = {
   onAddWateringTime: PropTypes.func.isRequired,
   onCloseClick: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired
};

export default AddWateringTimeModal;
