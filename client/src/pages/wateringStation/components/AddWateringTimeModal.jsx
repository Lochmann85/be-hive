import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import styled from 'styled-components';

import { Modal, Button, Form } from 'semantic-ui-react';

import { BeHiveButton } from '../../../assets/styles/UI';

const StyledTimePicker = styled(TimePicker)`
   width:100%;
   & > input {
      padding-top: 1.27em!important;
      padding-bottom: 1.27em!important;
   }
`;

class AddWateringTimeModal extends React.Component {

   constructor(props) {
      super(props);

      this.defaultState = {
         time: moment(),
         duration: 15
      };

      this.state = Object.assign({}, this.defaultState);
   };

   render() {
      const {
         time,
         duration
      } = this.state;

      return (
         <Modal open={this.props.open} size="small">
            <Modal.Header content="Add watering time" />
            <Modal.Content>
               <Form>
                  <Form.Group widths="equal">
                     <Form.Field required>
                        <label>Time</label>
                        <StyledTimePicker
                           value={time}
                           onChange={this._handleTimeChange}
                           showSecond={false} />
                     </Form.Field>
                     <Form.Input
                        required
                        label="Duration"
                        name="duration"
                        value={duration}
                        onChange={this._handleChange}
                     />
                  </Form.Group>
               </Form>
            </Modal.Content>
            <Modal.Actions>
               <Button content="Close" onClick={this._handleCloseClick} />
               <BeHiveButton
                  content="Add"
                  onClick={this._onAddWateringTimeClick} />
            </Modal.Actions>
         </Modal >
      );
   }

   _handleTimeChange = (time) => this.setState({ time });

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _handleCloseClick = () => this.setState(this.defaultState, this.props.onCloseClick());

   _onAddWateringTimeClick = () => {
      const {
         time,
         duration
      } = this.state;

      this.setState(this.defaultState, () => {
         this.props.onAddWateringTime({ id: 0, time: time.format("HH:mm"), duration });
      });
   };

};

AddWateringTimeModal.propTypes = {
   onAddWateringTime: PropTypes.func.isRequired,
   onCloseClick: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired
};

export default AddWateringTimeModal;
