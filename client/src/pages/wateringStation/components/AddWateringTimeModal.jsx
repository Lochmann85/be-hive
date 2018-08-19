import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

import { Modal, Button } from 'semantic-ui-react';

import { BeHiveButton } from '../../../assets/styles/UI';

const defaultTime = {
   hour: 12,
   minute: 0,
   duration: 15
};

class AddWateringTimeModal extends React.Component {

   constructor(props) {
      super(props);

      this.state = Object.assign({}, defaultTime);
   };

   render() {
      const {
         hour,
         minute,
      } = this.state;

      return (
         <Modal open={this.props.open} size="small">
            <Modal.Header content="Add watering time" />
            <Modal.Content>
               <TimePicker
                  onTimeChange={this._handleTimeChange}
                  time={`${hour}:${minute}`} />
            </Modal.Content>
            <Modal.Actions>
               <Button content="Close" onClick={this._handleCloseClick} />
               <BeHiveButton
                  content="Add"
                  onClick={this._onAddWateringTimeClick} />
            </Modal.Actions>
         </Modal>
      );
   }

   _handleTimeChange = (options) => {
      const {
         hour,
         minute
      } = options;

      this.setState({ hour, minute });
   };

   _handleCloseClick = () => this.setState(defaultTime, this.props.onCloseClick());

   _onAddWateringTimeClick = () => {
      const {
         hour,
         minute,
         duration
      } = this.state;

      this.setState(defaultTime, () => {
         this.props.onAddWateringTime({ id: 0, time: `${hour}:${minute}`, duration });
      });
   };

};

AddWateringTimeModal.propTypes = {
   onAddWateringTime: PropTypes.func.isRequired,
   onCloseClick: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired
};

export default AddWateringTimeModal;
