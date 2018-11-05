import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Message, Form, Button } from 'semantic-ui-react';

import { BeHiveButton } from '../../../assets/styles/UI';
import {
   FlexWrapper,
   ButtonGroupWrapper
} from '../../../assets/styles/Wrapper';

import browserHistory from '../../../storeHandler/routerHistory';
import checkForErrorInInput from '../../../helper/validation';
import PasswordChanger from './PasswordChanger';

const ButtonWithOffset = styled(Button)`
   margin-right: 1rem!important;
   @media only screen and (max-width:460px) { 
      margin-left: 0!important;
      margin-right: 0!important;
      flex: 1 1 auto!important;
   };
`;

const ButtonWrapperPc = styled(ButtonGroupWrapper)`
   @media only screen and (max-width:460px) { 
      display: none!important;
   }
`;

const ButtonWrapperMobile = styled(FlexWrapper)`
   @media only screen and (min-width:461px) { 
      display: none!important;
   };
   flex-direction: column;
   align-items: flex-start;
`;

const NewPasswordButton = styled(ButtonWithOffset)`
   @media only screen and (min-width:461px) {
      margin-left: 2rem!important;
   };
   @media only screen and (max-width:460px) {
      margin-bottom: 2rem!important;
   };
`;

const CancelButton = styled(ButtonWithOffset)`
   @media only screen and (max-width:460px) {
      margin-right: 1rem!important;
   };
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
               autoComplete="new-password"
               error={passwordHasError} />
         );
      }
      else {
         email = this.props.user.email;

         changePasswordButton = (
            <NewPasswordButton
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

      const submitButton = <BeHiveButton
         type="submit"
         content={this.props.submitButtonTitle}
         onClick={this._onSubmit} />;
      const cancelButton = <CancelButton
         as={"a"}
         content="Cancel"
         onClick={browserHistory.goBack} />;

      return (
         <Form>
            <Form.Input
               required
               label="E-Mail"
               name="email"
               onChange={this._handleChange}
               defaultValue={email}
               autoComplete="username"
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
            <ButtonWrapperPc>
               {cancelButton}
               {submitButton}
               {changePasswordButton}
            </ButtonWrapperPc>
            <ButtonWrapperMobile>
               {changePasswordButton}
               <FlexWrapper>
                  {cancelButton}
                  {submitButton}
               </FlexWrapper>
            </ButtonWrapperMobile>
            {changePasswordModal}
         </Form>
      );
   };

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      const {
         email,
      } = this.state;

      const userData = {
         name: this.state.name,
      };

      if (this.props.user) {
         if (this.props.user.email !== email) {
            userData.email = email;
         }
      }
      else {
         userData.email = email;
         userData.password = this.state.password;
      }

      this.props.onSubmit(userData);
   };

   _onPasswordChangeClick = () => this.setState({ openPasswordChangeModal: true })

   _onCloseClick = () => this.setState({ openPasswordChangeModal: false })
};

export default UserForm;