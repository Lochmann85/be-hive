import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table, Button, Dropdown, Icon, Message } from 'semantic-ui-react';

import QueryLoader from '../../components/layout/QueryLoader';
import { numberOfVisibleTableEntries } from './numberOfTableEntries';
import { FlexWrapper } from '../../assets/styles/Wrapper';

const RightAlignedContent = styled(FlexWrapper) `
   flex: 1 1 auto;
   justify-content: flex-end;
`;

const StyledEntriesText = styled.div`
   margin-right: 0.5rem;
`;

const AlignedDropdown = styled(Dropdown) `
   margin-right: 3rem!important;
`;

const BasePagedTable = (props) => {
   const {
      tableEntries,
      noEntriesFoundComment,
      createTableBody,
      createTableHeader,
      numberOfColumns,
      selectedNumberOfTableEntries,
      firstVisibleTableEntryIndex,
      onTableChange,
      query
   } = props;

   let content;

   if (tableEntries && Array.isArray(tableEntries) && tableEntries.length > 0) {

      const _handleVisibleTableEntriesChange = (event, { name, value }) => {
         if (firstVisibleTableEntryIndex >= selectedNumberOfTableEntries) {
            onTableChange("firstVisibleTableEntryIndex", 0);
         }
         onTableChange(name, value);
      };

      const _calculateCurrentPageNumber = () => {
         return Math.ceil(firstVisibleTableEntryIndex / selectedNumberOfTableEntries) + 1;
      };

      const _showFirstPage = () => {
         if (firstVisibleTableEntryIndex > 0) {
            onTableChange("firstVisibleTableEntryIndex", 0);
         }
      };

      const _showPreviousPage = () => {
         if (firstVisibleTableEntryIndex - selectedNumberOfTableEntries >= 0) {
            onTableChange("firstVisibleTableEntryIndex", firstVisibleTableEntryIndex - selectedNumberOfTableEntries);
         }
      };

      const _showNextPage = () => {
         if (tableEntries && Array.isArray(tableEntries)) {
            if (firstVisibleTableEntryIndex + selectedNumberOfTableEntries < tableEntries.length) {
               onTableChange("firstVisibleTableEntryIndex", firstVisibleTableEntryIndex + selectedNumberOfTableEntries);
            }
         }
      };

      const _showLastPage = () => {
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

      const visibleTableEntries = tableEntries.slice(firstVisibleTableEntryIndex, firstVisibleTableEntryIndex + selectedNumberOfTableEntries);

      let numberOfPages = parseInt(tableEntries.length / selectedNumberOfTableEntries, 10);
      if (tableEntries.length % selectedNumberOfTableEntries !== 0) {
         numberOfPages += 1;
      }

      const currentPageNumber = _calculateCurrentPageNumber(),
         tableBody = createTableBody(visibleTableEntries),
         tableHeader = createTableHeader();

      content = (
         <Table basic="very" compact selectable unstackable>
            {tableHeader}
            {tableBody}
            <Table.Footer>
               <Table.Row>
                  <Table.HeaderCell colSpan={numberOfColumns}>
                     <FlexWrapper>
                        <div>{currentPageNumber} / {numberOfPages}</div>
                        <RightAlignedContent>
                           <StyledEntriesText>Entries per page</StyledEntriesText>
                           <AlignedDropdown selection compact
                              name="selectedNumberOfTableEntries"
                              value={selectedNumberOfTableEntries}
                              options={numberOfVisibleTableEntries}
                              onChange={_handleVisibleTableEntriesChange} />
                           <Button.Group>
                              <Button icon content={<Icon className="ficon-angle-double-left" />}
                                 onClick={_showFirstPage} />
                              <Button icon content={<Icon className="ficon-angle-left" />}
                                 onClick={_showPreviousPage} />
                              <Button icon content={<Icon className="ficon-angle-right" />}
                                 onClick={_showNextPage} />
                              <Button icon content={<Icon className="ficon-angle-double-right" />}
                                 onClick={_showLastPage} />
                           </Button.Group>
                        </RightAlignedContent>
                     </FlexWrapper>
                  </Table.HeaderCell>
               </Table.Row>
            </Table.Footer>
         </Table>
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

BasePagedTable.propTypes = {
   tableEntries: PropTypes.array,
   noEntriesFoundComment: PropTypes.string.isRequired,
   createTableBody: PropTypes.func.isRequired,
   createTableHeader: PropTypes.func.isRequired,
   numberOfColumns: PropTypes.number.isRequired,
   selectedNumberOfTableEntries: PropTypes.number.isRequired,
   firstVisibleTableEntryIndex: PropTypes.number.isRequired,
   onTableChange: PropTypes.func.isRequired,
};

export default BasePagedTable;