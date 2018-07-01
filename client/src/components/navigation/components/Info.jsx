import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Header } from 'semantic-ui-react';

const Info = ({ onCloseClick, ...others }) => (
   <Modal size="small" {...others}>
      <Modal.Header>Alfredo's Bee Hive App</Modal.Header>
      <Modal.Content>
         <Modal.Description>
            <Header>be-hive - 0.2.1</Header>
            <p>Tool for setting the timing on the water station.</p>
            <p>The weather data is saved.</p>
            <p>Copyright © 2018 Locco</p>
         </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
         <Button content="Close" onClick={onCloseClick} />
      </Modal.Actions>
   </Modal>
);

Info.propTypes = {
   onCloseClick: PropTypes.func.isRequired,
};

export default Info;
