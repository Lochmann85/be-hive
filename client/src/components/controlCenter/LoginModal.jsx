import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Modal, Message, Form } from 'semantic-ui-react';

import {
   BeHiveButton,
   BeHiveIcon,
} from '../../assets/styles/UI';
import { FlexWrapper } from '../../assets/styles/Wrapper';

import checkForErrorInInput from '../../helper/validation';

const CloseIcon = styled(BeHiveIcon)`
   font-size: 1.2em!important;
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
      onLoginSuccess: PropTypes.func.isRequired,
      open: PropTypes.bool.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         email: "",
         password: "",
         errors: [],
      };
   }

   render() {
      const {
         open,
      } = this.props;

      const errors = this.state.errors;

      const emailHasError = checkForErrorInInput("email", errors);
      const passwordHasError = checkForErrorInInput("password", errors);

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
                     error={emailHasError} />
                  <Form.Input
                     label="Password"
                     name="password"
                     type="password"
                     onChange={this._handleChange}
                     error={passwordHasError} />
                  <Message error visible hidden={errors.length === 0}>
                     <Message.List items={errors.map(error => error.message)} />
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
   }, this.props.onCloseClick)

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _handleLoginSubmit = (event) => {
      event.preventDefault();
   }

   _onShowError = (errors) => this.setState({ errors });
};

export default LoginModal;