import styled from 'styled-components';

export const Main = styled.main<{ isOpen: boolean; }>`
  transition: 0.6s;
  min-height: 90vh;


  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: ${({ isOpen }) => isOpen ? 'calc(100% - 275px)' : '100%'};
    left: ${({ isOpen }) => isOpen ? '275px' : '0'};
    position: relative;
  }
`;