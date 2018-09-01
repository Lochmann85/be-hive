import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Form, Icon, Table } from 'semantic-ui-react';

import { BeHiveYellowHoverCss, BeHiveButton, BeHiveIcon } from '../../../assets/styles/UI';
import { FlexWrapper } from '../../../assets/styles/Wrapper';
import InteractionTableRow from '../../../components/table/InteractionTableRow';
import AddWateringTimeModal from './AddWateringTimeModal';
import checkForErrorInInput from '../../../helper/validation';

const StyledTable = styled(Table)`
   @media only screen and (min-width: 400px) {
      width:350px!important;
   }
   & th:last-child, td:last-child {
      width: 79px;
      text-align:center!important;
   }
`;

const StyledAddHeaderCell = styled(Table.HeaderCell)`
   pointer: cursor!important;
   ${BeHiveYellowHoverCss}
`;

const ContentOffsetWrapper = styled.div`
   margin-bottom: 2rem;
`;

const wateringStationFragment = {
   name: "WateringTimeSelection",
   document: gql`
   fragment WateringTimeSelection on WateringStation {
      wateringTimes {
         id
         duration
         time
      }
   }`
};

class WateringTimeSelection extends React.Component {

   static fragments = {
      wateringStation: wateringStationFragment
   }

   static propTypes = {
      onChange: PropTypes.func.isRequired,
      wateringStation: propType(wateringStationFragment.document),
   }

   constructor(props) {
      super(props);

      this.state = {
         openAddWatering: false,
         selectedWatering: null,
      };
   }

   render() {
      const wateringTimes = this.props.wateringStation.wateringTimes;

      const errors = this.props.errors ? this.props.errors : [];
      const wateringTimesHasError = checkForErrorInInput("wateringTimes", errors);

      let content;
      if (Array.isArray(wateringTimes) && wateringTimes.length > 0) {
         const InteractionCell = ({ isSelected, onLoosesFocus, wateringIndex }) => {
            const handleWateringEdit = () => {
               onLoosesFocus().then(() => {
                  this._handleWateringEdit(wateringIndex);
               });
            };

            let deleteIcon,
               editIcon;
            if (isSelected) {
               deleteIcon = <BeHiveIcon className="ficon-cancel" color="red" link onClick={() => this._handleWateringDelete(wateringIndex)} />;
               editIcon = <BeHiveIcon className="ficon-edit" color="blue" link onClick={handleWateringEdit} />;
            }

            return (
               <Table.Cell>
                  <FlexWrapper>
                     {editIcon}
                     {deleteIcon}
                  </FlexWrapper>
               </Table.Cell>
            );
         };
         InteractionCell.hasSelectionState = true;

         const wateringTimesTableBody = wateringTimes.map((watering, index) =>
            <InteractionTableRow key={index}>
               <Table.Cell content={watering.time} />
               <Table.Cell content={watering.duration} />
               <InteractionCell wateringIndex={index} />
            </InteractionTableRow>
         );

         content = (
            <StyledTable selectable unstackable>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell content="Time" />
                     <Table.HeaderCell content="Duration" />
                     <StyledAddHeaderCell content={<Icon className="ficon-plus" />} onClick={this._openAddWatering} />
                  </Table.Row>
               </Table.Header>
               <Table.Body>
                  {wateringTimesTableBody}
               </Table.Body>
            </StyledTable>
         );
      }
      else {
         content = <BeHiveButton content="Add watering time" onClick={this._openAddWatering} />;
      }

      return (
         <Form.Field
            error={wateringTimesHasError}>
            <label>Watering times</label>
            <ContentOffsetWrapper>
               {content}
            </ContentOffsetWrapper>
            <AddWateringTimeModal
               open={this.state.openAddWatering}
               watering={this.state.selectedWatering}
               onCloseClick={this._handleCloseAddWatering}
               onWateringTimeChange={this._handleWateringTimeChange} />
         </Form.Field>
      );
   };

   _handleWateringDelete = (indexToDelete) => {
      const {
         onChange,
         wateringStation
      } = this.props;

      const wateringTimesCopy = wateringStation.wateringTimes.filter((entry, index) => index !== indexToDelete);

      onChange({}, { name: "wateringTimes", value: wateringTimesCopy });
   };

   _handleWateringEdit = (indexToEdit) => {
      const watering = this.props.wateringStation.wateringTimes[indexToEdit];

      this.setState({
         openAddWatering: true,
         selectedWatering: Object.assign({ index: indexToEdit }, watering)
      });
   };

   _openAddWatering = () => this.setState({ openAddWatering: true, selectedWatering: null });

   _handleCloseAddWatering = () => this.setState({ openAddWatering: false, selectedWatering: null });

   _handleWateringTimeChange = (wateringTime) => {
      const {
         onChange,
         wateringStation
      } = this.props;
      const {
         selectedWatering
      } = this.state;

      let changeCallback = () => onChange({}, { name: "wateringTimes", value: [...wateringStation.wateringTimes, wateringTime] });

      if (selectedWatering) {
         const value = wateringStation.wateringTimes.map((watering, index) => {
            if (index === selectedWatering.index) {
               return wateringTime;
            }
            return watering;
         });

         changeCallback = () => onChange({}, { name: "wateringTimes", value });
      }

      this.setState({ openAddWatering: false, selectedWatering: null }, changeCallback);
   };
};

export default WateringTimeSelection;