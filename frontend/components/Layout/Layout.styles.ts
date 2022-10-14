import styled from 'styled-components';

export const Main = styled.main<{ open: boolean; }>`
  transition: .8s;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: ${({ open }) => open ? 'calc(100% - 275px)' : '100%'};
    margin: ${({ open }) => open ? '0 0 0 auto' : '0 auto'};
  }
`;