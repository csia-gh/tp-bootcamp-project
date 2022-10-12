import styled from 'styled-components';

export const Main = styled.main<{ open: boolean; }>`
  background-color: ${({ theme }) => theme.colors.primary};
  transition: .8s;
  min-height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: ${({ open }) => open ? 'calc(100% - 275px)' : '100%'};
    margin-left: auto;
    padding: 0 2rem;
  }
`;