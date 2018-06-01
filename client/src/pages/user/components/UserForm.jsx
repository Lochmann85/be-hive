import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Message, Form, Button } from 'semantic-ui-react';

import { BeHiveButton } from '../../../assets/styles/UI';
import browserHistory from '../../../storeHandler/routerHistory';
import checkForErrorInInput from '../../../helper/validation';
import PasswordChanger from './PasswordChanger';
import ButtonGroup from '../../../components/layout/ButtonGroup';

const StyledNewPasswordButton = styled(Button) `
   margin-right: 2.5rem!important;
`;

const userFragment = {
   name: "UserFormUser",
   document: gql`
   fragment UserFormUser on User {
      id
      email
      name
      ...${PasswordChanger.fragments.user.name}
   }
   ${PasswordChanger.fragments.user.document}`

};

class UserForm extends React.Component {

   static fragments = {
      user: userFragment
   }

   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      user: propType(userFragment.document),
      submitButtonTitle: PropTypes.string.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         email: props.user ? props.user.email : "",
         name: props.user ? props.user.name : "",
         password: "",
         openPasswordChangeModal: false,
      };
   }

   render() {
      const errors = this.props.errors ? this.props.errors : [];
      const emailHasError = checkForErrorInInput("email", errors);
      const nameHasError = checkForErrorInInput("name", errors);
      const passwordHasError = checkForErrorInInput("password", errors);

      let email = "",
         passwordInput = null,
         changePasswordButton = null,
         changePasswordModal = null;

      if (!this.props.user) {
         passwordInput = (
            <Form.Input
               required
               label="Password"
               name="password"
               type="password"
               onChange={this._handleChange}
               error={passwordHasError} />
         );
      }
      else {
         email = this.props.user.email;

         changePasswordButton = (
            <StyledNewPasswordButton
               content="New password"
               as={"a"}
               onClick={this._onPasswordChangeClick} />
         );

         changePasswordModal = (
            <PasswordChanger
               user={this.props.user}
               header="Change password"
               description={`Change the password.`}
               onCloseClick={this._onCloseClick}
               open={this.state.openPasswordChangeModal} />
         );
      }

      return (
         <Form>
            <Form.Input
               required
               label="E-Mail"
               name="email"
               onChange={this._handleChange}
               defaultValue={email}
               error={emailHasError} />
            <Form.Input
               required
               label="Name"
               name="name"
               onChange={this._handleChange}
               defaultValue={this.state.name}
               error={nameHasError} />
            {passwordInput}
            <Message error visible hidden={errors.length === 0}>
               <Message.List items={errors.map(error => error.message)} />
            </Message>
            <ButtonGroup>
               {changePasswordButton}
               <Button as={"a"} onClick={browserHistory.goBack} content="Cancel" />
               <BeHiveButton
                  type="submit"
                  content={this.props.submitButtonTitle}
                  onClick={this._onSubmit} />
            </ButtonGroup>
            {changePasswordModal}
         </Form>
      );
   };

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      const userData = {
         email: this.state.email,
         name: this.state.name,
      };

      if (!this.props.user) {
         userData.password = this.state.password;
      }

      this.props.onSubmit(userData);
   };

   _onPasswordChangeClick = () => this.setState({ openPasswordChangeModal: true })

   _onCloseClick = () => this.setState({ openPasswordChangeModal: false })
};

export default UserForm;