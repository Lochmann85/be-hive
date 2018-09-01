import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

import { Message, Form, Button } from 'semantic-ui-react';

import { BeHiveButton } from '../../../assets/styles/UI';
import { ButtonGroupWrapper } from '../../../assets/styles/Wrapper';
import WateringTimeSelection from './WateringTimeSelection';
import browserHistory from '../../../storeHandler/routerHistory';
import checkForErrorInInput from '../../../helper/validation';

const wateringStationFragment = {
   name: "WateringStationFormWateringStation",
   document: gql`
   fragment WateringStationFormWateringStation on WateringStation {
      id
      name
      description
      isActive
      ...${WateringTimeSelection.fragments.wateringStation.name}
   }
   ${WateringTimeSelection.fragments.wateringStation.document}`
};

class WateringStationForm extends React.Component {

   static fragments = {
      wateringStation: wateringStationFragment
   }

   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      wateringStation: propType(wateringStationFragment.document),
      submitButtonTitle: PropTypes.string.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         name: props.wateringStation ? props.wateringStation.name : "",
         description: props.wateringStation ? props.wateringStation.description : "",
         isActive: props.wateringStation ? props.wateringStation.isActive : false,
         wateringTimes: props.wateringStation ? props.wateringStation.wateringTimes : [],
      };
   }

   render() {
      const errors = this.props.errors ? this.props.errors : [];
      const nameHasError = checkForErrorInInput("name", errors);
      const descriptionHasError = checkForErrorInInput("description", errors);

      const submitButton = <BeHiveButton
         type="submit"
         content={this.props.submitButtonTitle}
         onClick={this._onSubmit} />;
      const cancelButton = <Button
         as={"a"}
         content="Cancel"
         onClick={browserHistory.goBack} />;

      return (
         <Form>
            <Form.Input
               required
               label="Name"
               name="name"
               onChange={this._handleChange}
               defaultValue={this.state.name}
               error={nameHasError} />
            <Form.Input
               label="Description"
               name="description"
               onChange={this._handleChange}
               defaultValue={this.state.description}
               error={descriptionHasError} />
            <Form.Checkbox
               label="Is watering station active"
               name="isActive"
               onChange={this._handleCheckboxChange}
               checked={this.state.isActive} />
            <WateringTimeSelection
               wateringStation={this.state}
               onChange={this._handleChange}
               errors={errors} />
            <Message error visible hidden={errors.length === 0}>
               <Message.List items={errors.map(error => error.message)} />
            </Message>
            <ButtonGroupWrapper>
               {cancelButton}
               {submitButton}
            </ButtonGroupWrapper>
         </Form>
      );
   };

   _handleCheckboxChange = () => this.setState({ isActive: !this.state.isActive });

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      const wateringStationData = {
         name: this.state.name,
         description: this.state.description,
         isActive: this.state.isActive,
         wateringTimes: this.state.wateringTimes.map(watering => ({
            duration: watering.duration,
            time: watering.time
         })),
      };

      this.props.onSubmit(wateringStationData);
   };
};

export default WateringStationForm;