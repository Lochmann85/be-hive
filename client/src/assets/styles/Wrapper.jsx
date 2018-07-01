import styled, { css } from 'styled-components';

const FlexWrapper = styled.div`
   display: flex;
   align-items: center;
`;

const ButtonGroupWrapper = styled(FlexWrapper)`
   justify-content: flex-end;
   & > .button {
      margin-left: 0.75rem!important;
   };
   & :last-child {
      margin-right: 0!important;
   };
`;

const textEllipsisCss = css`
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
`;

const TextEllipsisWrapper = styled.div`
   ${textEllipsisCss}
`;

export {
   FlexWrapper,
   ButtonGroupWrapper,
   TextEllipsisWrapper,
};