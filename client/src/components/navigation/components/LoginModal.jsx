import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Modal, Message, Form } from 'semantic-ui-react';

import {
   BeHiveButton,
   BeHiveIcon,
} from '../../../assets/styles/UI';
import { FlexWrapper } from '../../../assets/styles/Wrapper';

import checkForErrorInInput from '../../../helper/validation';
import { convertOnlyValidationError } from '../../errorHandling/convertValidationError';

const CloseIcon = styled(BeHiveIcon)`
   font-size: 0.9em!important;
   cursor: pointer;
   margin-top: -0.5rem!important;
   margin-right: -1.25rem!important;
`;

const HeaderWrapper = styled.div`
   flex: 1 1 auto;
`;

class LoginModal extends React.Component {

   static propTypes = {
      onCloseClick: PropTypes.func.isRequired,
      onLoginSubmit: PropTypes.func.isRequired,
      open: PropTypes.bool.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         email: "",
         password: "",
         loginErrors: [],
      };
   }

   render() {
      const {
         open,
      } = this.props;
      const {
         loginErrors
      } = this.state;

      const emailHasError = checkForErrorInInput("email", loginErrors);
      const passwordHasError = checkForErrorInInput("password", loginErrors);

      return (
         <Modal
            size="tiny"
            open={open}>
            <Modal.Header content={
               <FlexWrapper>
                  <HeaderWrapper>Log In</HeaderWrapper>
                  <CloseIcon className="ficon-cancel" onClick={this._handleCloseClick} />
               </FlexWrapper>
            } />
            <Modal.Content>
               <Form onSubmit={this._handleLoginSubmit}>
                  <Form.Input
                     label="E-Mail"
                     name="email"
                     onChange={this._handleChange}
                     autoComplete="username"
                     error={emailHasError} />
                  <Form.Input
                     label="Password"
                     name="password"
                     type="password"
                     onChange={this._handleChange}
                     autoComplete="current-password"
                     error={passwordHasError} />
                  <Message error visible hidden={loginErrors.length === 0}>
                     <Message.List items={loginErrors.map(error => error.message)} />
                  </Message>
                  <Form.Field control={BeHiveButton} primary fluid type="submit" content="Log In" />
               </Form>
            </Modal.Content>
         </Modal>
      );
   }

   _handleCloseClick = () => this.setState({
      email: "",
      password: "",
      loginErrors: [],
   }, this.props.onCloseClick)

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _handleLoginSubmit = (event) => {
      event.preventDefault();

      const credentials = {
         email: this.state.email,
         password: this.state.password,
      };

      this.props.onLoginSubmit(credentials)
         .then(() => this._handleCloseClick())
         .catch(error => convertOnlyValidationError(error, this._onShowError));
   }

   _onShowError = (errors) => this.setState({ loginErrors: errors })
};

export default LoginModal;