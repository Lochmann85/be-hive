import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Message } from 'semantic-ui-react';

const DeleteConfirmation = (props) => {
   const {
      description,
      onDeleteConfirmation,
      onCloseClick,
      errors,
      open
   } = props;

   const _onDeleteClick = (event) => {
      event.preventDefault();
      onDeleteConfirmation();
   };

   return (
      <Modal open={open} size="small">
         <Modal.Header content="Delete confirmation" />
         <Modal.Content>
            <Modal.Description>
               <p>{description}</p>
               <Message
                  negative
                  visible
                  hidden={errors.length === 0}
                  list={errors.map(error => error.message)} />
            </Modal.Description>
         </Modal.Content>
         <Modal.Actions>
            <Button content="Close" onClick={onCloseClick} />
            <Button
               negative
               content="Delete"
               onClick={_onDeleteClick} />
         </Modal.Actions>
      </Modal>
   );
};

DeleteConfirmation.propTypes = {
   description: PropTypes.string.isRequired,
   onDeleteConfirmation: PropTypes.func.isRequired,
   onCloseClick: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   errors: PropTypes.array,
};

export default DeleteConfirmation;
