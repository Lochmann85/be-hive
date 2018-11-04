import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table, Button, Dropdown, Icon, Message, Accordion } from 'semantic-ui-react';

import QueryLoader from '../../components/layout/QueryLoader';
import { numberOfVisibleTableEntries } from './numberOfTableEntries';
import { FlexWrapper } from '../../assets/styles/Wrapper';

const RightAlignedContent = styled(FlexWrapper)`
   flex: 1 1 auto;
   justify-content: flex-end;
   @media only screen and (max-width: 767px) { 
      flex-direction: column;
      align-items: flex-start;
      & > div {
         margin-bottom: 1rem;
      };
   };
`;

const StyledEntriesText = styled.div`
   margin-right: 0.5rem;
`;

const AlignedDropdown = styled(Dropdown)`
   margin-right: 3rem!important;
`;

const StyledTableCell = styled(Table.Cell)`
   padding: 0!important;
`;

const StyledAccordion = styled(Accordion)`
   & > div.title {
      border-top:1px solid rgba(34,36,38,.1);
   };
   & > div:first-child {
      border-top: none;
   };
   & > div:last-child {
      padding-bottom: 1rem!important;
   };
`;

const StyledTable = styled(Table)`
   thead tr th {
      padding: .92857143em .78571429em!important;
   };
`;

const StyledTableBottom = styled(FlexWrapper)`
   @media only screen and (max-width: 767px) { 
      flex-direction: column;
      align-items: flex-start;
      & > div {
         margin-bottom: 1rem;
      };
   };
`;

const StyledEntriesSelection = styled.div`
   flex-direction: row;
   display: flex;
   align-items: center;
`;

class BasePagedTable extends React.Component {

   static propTypes = {
      tableEntries: PropTypes.array,
      noEntriesFoundComment: PropTypes.string.isRequired,
      createTableBody: PropTypes.func.isRequired,
      createTableHeader: PropTypes.func.isRequired,
      numberOfColumns: PropTypes.number.isRequired,
      selectedNumberOfTableEntries: PropTypes.number.isRequired,
      firstVisibleTableEntryIndex: PropTypes.number.isRequired,
      onTableChange: PropTypes.func.isRequired,
   };

   render() {
      const {
         tableEntries,
         noEntriesFoundComment,
         createTableBody,
         createTableHeader,
         numberOfColumns,
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
         query,
      } = this.props;

      let content;

      if (tableEntries && Array.isArray(tableEntries) && tableEntries.length > 0) {

         const visibleTableEntries = tableEntries.slice(firstVisibleTableEntryIndex, firstVisibleTableEntryIndex + selectedNumberOfTableEntries);

         let numberOfPages = parseInt(tableEntries.length / selectedNumberOfTableEntries, 10);
         if (tableEntries.length % selectedNumberOfTableEntries !== 0) {
            numberOfPages += 1;
         }

         const currentPageNumber = this._calculateCurrentPageNumber(),
            tableBody = createTableBody(visibleTableEntries),
            tableHeader = createTableHeader();

         content = (
            <StyledTable basic="very" unstackable>
               {tableHeader}
               <Table.Body>
                  <Table.Row>
                     <StyledTableCell colSpan={numberOfColumns}>
                        <StyledAccordion>
                           {tableBody}
                        </StyledAccordion>
                     </StyledTableCell>
                  </Table.Row>
               </Table.Body>
               <Table.Footer>
                  <Table.Row>
                     <Table.HeaderCell colSpan={numberOfColumns}>
                        <StyledTableBottom>
                           <div>{currentPageNumber} / {numberOfPages}</div>
                           <RightAlignedContent>
                              <StyledEntriesSelection>
                                 <StyledEntriesText>Entries per page</StyledEntriesText>
                                 <AlignedDropdown selection compact
                                    name="selectedNumberOfTableEntries"
                                    value={selectedNumberOfTableEntries}
                                    options={numberOfVisibleTableEntries}
                                    onChange={this._handleVisibleTableEntriesChange} />
                              </StyledEntriesSelection>
                              <Button.Group>
                                 <Button icon content={<Icon className="ficon-angle-double-left" />}
                                    onClick={this._showFirstPage} />
                                 <Button icon content={<Icon className="ficon-angle-left" />}
                                    onClick={this._showPreviousPage} />
                                 <Button icon content={<Icon className="ficon-angle-right" />}
                                    onClick={this._showNextPage} />
                                 <Button icon content={<Icon className="ficon-angle-double-right" />}
                                    onClick={this._showLastPage} />
                              </Button.Group>
                           </RightAlignedContent>
                        </StyledTableBottom>
                     </Table.HeaderCell>
                  </Table.Row>
               </Table.Footer>
            </StyledTable>
         );
      }
      else {
         content = <Message visible content={noEntriesFoundComment} />;
      }

      return (
         <QueryLoader query={query} >
            {content}
         </QueryLoader>
      );
   };

   _handleVisibleTableEntriesChange = (event, { name, value }) => {
      const {
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
         onTableChange,
      } = this.props;

      if (firstVisibleTableEntryIndex >= selectedNumberOfTableEntries) {
         onTableChange("firstVisibleTableEntryIndex", 0);
      }
      onTableChange(name, value);
   };

   _calculateCurrentPageNumber = () => {
      const {
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
      } = this.props;

      return Math.ceil(firstVisibleTableEntryIndex / selectedNumberOfTableEntries) + 1;
   };

   _showFirstPage = () => {
      const {
         firstVisibleTableEntryIndex,
         onTableChange,
      } = this.props;

      if (firstVisibleTableEntryIndex > 0) {
         onTableChange("firstVisibleTableEntryIndex", 0);
      }
   };

   _showPreviousPage = () => {
      const {
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
         onTableChange,
      } = this.props;

      if (firstVisibleTableEntryIndex - selectedNumberOfTableEntries >= 0) {
         onTableChange("firstVisibleTableEntryIndex", firstVisibleTableEntryIndex - selectedNumberOfTableEntries);
      }
   };

   _showNextPage = () => {
      const {
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
         onTableChange,
         tableEntries,
      } = this.props;

      if (tableEntries && Array.isArray(tableEntries)) {
         if (firstVisibleTableEntryIndex + selectedNumberOfTableEntries < tableEntries.length) {
            onTableChange("firstVisibleTableEntryIndex", firstVisibleTableEntryIndex + selectedNumberOfTableEntries);
         }
      }
   };

   _showLastPage = () => {
      const {
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
         onTableChange,
         tableEntries,
      } = this.props;

      if (tableEntries && Array.isArray(tableEntries)) {
         if (firstVisibleTableEntryIndex + selectedNumberOfTableEntries <= tableEntries.length) {

            const remainingEntries = tableEntries.length % selectedNumberOfTableEntries;
            if (remainingEntries === 0) {
               onTableChange("firstVisibleTableEntryIndex", tableEntries.length - selectedNumberOfTableEntries);
            }
            else {
               onTableChange("firstVisibleTableEntryIndex", tableEntries.length - remainingEntries);
            }
         }
      }
   };
};

export default BasePagedTable;