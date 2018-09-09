import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import styled from 'styled-components';

import { Modal, Button, Form, Message } from 'semantic-ui-react';

import { BeHiveButton } from '../../../assets/styles/UI';
import checkForErrorInInput from '../../../helper/validation';

const durationBound = {
   lower: 5,
   upper: 240
};
const timeExcludedRange = {
   hour: 0,
   minute: {
      lower: 0,
      upper: 10
   }
};

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
         duration: 15,
         errors: []
      };

      this.state = Object.assign({}, this.defaultState);
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.watering) {
         const time = moment(nextProps.watering.time, "HH:mm");

         this.setState({
            time,
            duration: nextProps.watering.duration
         });
      }
   };

   render() {
      const {
         time,
         duration,
         errors
      } = this.state;

      const timeHasError = checkForErrorInInput("time", errors);
      const durationHasError = checkForErrorInInput("duration", errors);


      return (
         <Modal open={this.props.open} size="small">
            <Modal.Header content="Add watering time" />
            <Modal.Content>
               <Form>
                  <Form.Group widths="equal">
                     <Form.Field required error={timeHasError}>
                        <label>Time</label>
                        <StyledTimePicker
                           value={time}
                           onChange={this._handleTimeChange}
                           showSecond={false} />
                     </Form.Field>
                     <Form.Input
                        required
                        error={durationHasError}
                        label="Duration"
                        name="duration"
                        value={duration}
                        onChange={this._handleChange}
                     />
                  </Form.Group>
                  <Message error visible hidden={errors.length === 0}>
                     <Message.List items={errors.map(error => error.message)} />
                  </Message>
               </Form>
            </Modal.Content>
            <Modal.Actions>
               <Button content="Close" onClick={this._handleCloseClick} />
               <BeHiveButton
                  content={this.props.watering ? "Update" : "Add"}
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

      let errors = [];
      if (durationBound.lower >= duration || duration >= durationBound.upper) {
         errors.push({
            path: "duration",
            message: `The duration must be larger then ${durationBound.lower} and smaller ${durationBound.upper}.`
         });
      }
      const minute = time.minute();
      if (time.hour() === timeExcludedRange.hour && timeExcludedRange.minute.lower <= minute && minute <= timeExcludedRange.minute.upper) {
         errors.push({
            path: "time",
            message: `The time between 0:00 and 0:10 is not allowed.`
         });
      }

      if (errors.length > 0) {
         this.setState({ errors });
      }
      else {
         this.setState(this.defaultState, () => {
            this.props.onWateringTimeChange({ id: 0, time: time.format("HH:mm"), duration });
         });
      }
   };

};

AddWateringTimeModal.propTypes = {
   watering: PropTypes.shape({
      time: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired
   }),
   onWateringTimeChange: PropTypes.func.isRequired,
   onCloseClick: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired
};

export default AddWateringTimeModal;
