import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Form, Icon, Table } from 'semantic-ui-react';

import { BeHiveYellowHoverCss, BeHiveButton, BeHiveIcon } from '../../../assets/styles/UI';
import InteractionTableRow from '../../../components/table/InteractionTableRow';
import AddWateringTimeModal from './AddWateringTimeModal';
import checkForErrorInInput from '../../../helper/validation';

const StyledTable = styled(Table)`
   @media only screen and (min-width: 400px) {
      width:350px!important;
   }
   & th:first-child, td:first-child, th:nth-child(2), td:nth-child(2) {
      width: 40%;
   }
   & th:nth-child(3), td:nth-child(3) {
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
         openAddWatering: false
      };
   }

   render() {
      const wateringTimes = this.props.wateringStation.wateringTimes;

      const errors = this.props.errors ? this.props.errors : [];
      const wateringTimesHasError = checkForErrorInInput("wateringTimes", errors);

      let content;
      if (Array.isArray(wateringTimes) && wateringTimes.length > 0) {
         const InteractionCell = ({ isSelected, wateringIndex }) => {
            let content;
            if (isSelected) {
               content = <BeHiveIcon className="ficon-cancel" color="red" link onClick={() => this._handleWateringDelete(wateringIndex)} />;
            }

            return (
               <Table.Cell>
                  {content}
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
               onCloseClick={this._handleCloseAddWatering}
               onAddWateringTime={this._handleAddWateringTime} />
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

   _openAddWatering = () => this.setState({ openAddWatering: true });

   _handleCloseAddWatering = () => this.setState({ openAddWatering: false });

   _handleAddWateringTime = (wateringTime) => {
      const {
         onChange,
         wateringStation
      } = this.props;

      this.setState({ openAddWatering: false }, () => {
         onChange({}, { name: "wateringTimes", value: [...wateringStation.wateringTimes, wateringTime] });
      });
   };
};

export default WateringTimeSelection;