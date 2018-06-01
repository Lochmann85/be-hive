import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { Form, Modal, Button, Message } from 'semantic-ui-react';

import { BeHiveButton } from '../../../assets/styles/UI';

import changeUserPasswordMutation from '../graphql/mutations/changeUserPassword';
import checkForErrorInInput from '../../../helper/validation';
import { convertOnlyValidationError } from '../../../components/errorHandling/convertValidationError';

const StyledDescription = styled(Modal.Description) `
   margin-bottom: 1rem!important;
`;

const userFragment = {
   name: "PasswordChangerUser",
   document: gql`
   fragment PasswordChangerUser on User {
      id
      name
   }`
};

class PasswordChanger extends React.Component {

   static fragments = {
      user: userFragment
   }

   static propTypes = {
      user: propType(userFragment.document),
      header: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      onCloseClick: PropTypes.func.isRequired,
      open: PropTypes.bool.isRequired,
   };

   constructor(props) {
      super(props);
      this.state = {
         showSuccessBox: false,
         password: "",
         new: "",
         confirm: "",
         errors: []
      };
   }

   render() {
      const {
         header,
         description,
         open
      } = this.props;

      const passwordHasError = checkForErrorInInput("password", this.state.errors);
      const newHasError = checkForErrorInInput("new", this.state.errors);
      const confirmHasError = checkForErrorInInput("confirm", this.state.errors);

      let successBox = (this.state.showSuccessBox && this.state.errors.length <= 0) ? <Message
         success
         visible
         content="Password changed!" /> : null;
      let errorBox = (this.state.errors.length > 0) ? <Message
         error
         visible
         list={this.state.errors.map(error => error.message)} /> : null;

      return (
         <Modal open={open} size="small">
            <Modal.Header content={header} />
            <Modal.Content>
               <StyledDescription>
                  {description}
               </StyledDescription>
               <Form>
                  <Form.Input
                     name="password"
                     label="Old password"
                     type="password"
                     onChange={this._handleChange}
                     error={passwordHasError} />
                  <Form.Input
                     name="new"
                     label="New password"
                     type="password"
                     onChange={this._handleChange}
                     error={newHasError} />
                  <Form.Input
                     label="Confirm password"
                     name="confirm"
                     type="password"
                     onChange={this._handleChange}
                     error={confirmHasError} />
               </Form >
               {successBox}
               {errorBox}
            </Modal.Content>
            <Modal.Actions>
               <Button content="Close"
                  onClick={this._onClose} />
               <BeHiveButton primary
                  content="Confirm"
                  type="submit"
                  onClick={this._onSubmit} />
            </Modal.Actions>
         </Modal>
      );
   }

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      const {
         changeUserPassword,
         user,
      } = this.props;

      const passwordChangeData = {
         password: this.state.password,
         new: this.state.new,
         confirm: this.state.confirm,
      };
      changeUserPassword(user.id, passwordChangeData)
         .then(response => {
            this.setState({
               showSuccessBox: true,
               errors: []
            });
         })
         .catch(error => convertOnlyValidationError(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({ errors });

   _onClose = () => {
      this.setState({
         errors: [],
         showSuccessBox: false
      }, () => this.props.onCloseClick());
   };
};

const changeUserPassword = changeUserPasswordMutation();

export default graphql(
   changeUserPassword.document, changeUserPassword.config
)(PasswordChanger);
