import React from 'react';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Message, Form, Button } from 'semantic-ui-react';

import {
   FlexWrapper,
   ButtonGroupWrapper
} from '../../../assets/styles/Wrapper';

import browserHistory from '../../../storeHandler/routerHistory';
import checkForErrorInInput from '../../../helper/validation';

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
   }`
};

class UserForm extends React.Component {

   static fragments = {
      user: userFragment
   }

   static propTypes = {
      user: propType(userFragment.document),
   }

   constructor(props) {
      super(props);

      this.state = {
         email: props.user ? props.user.email : "",
         name: props.user ? props.user.name : "",
         password: "",
      };
   }

   render() {
      const errors = this.props.errors ? this.props.errors : [];
      const emailHasError = checkForErrorInInput("email", errors);
      const nameHasError = checkForErrorInInput("name", errors);
      const passwordHasError = checkForErrorInInput("password", errors);

      let email = "",
         passwordInput = null;

      if (!this.props.user) {
         passwordInput = (
            <Form.Input
               required
               label="Password"
               name="password"
               type="password"
               onChange={this._handleChange}
               autoComplete="new-password"
               error={passwordHasError}
               readOnly={true} />
         );
      }
      else {
         email = this.props.user.email;
      }

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
               readOnly={true}
               error={emailHasError} />
            <Form.Input
               required
               label="Name"
               name="name"
               onChange={this._handleChange}
               defaultValue={this.state.name}
               readOnly={true}
               error={nameHasError} />
            {passwordInput}
            <Message error visible hidden={errors.length === 0}>
               <Message.List items={errors.map(error => error.message)} />
            </Message>
            <ButtonWrapperPc>
               {cancelButton}
            </ButtonWrapperPc>
            <ButtonWrapperMobile>
               <FlexWrapper>
                  {cancelButton}
               </FlexWrapper>
            </ButtonWrapperMobile>
         </Form>
      );
   };

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });
};

export default UserForm;