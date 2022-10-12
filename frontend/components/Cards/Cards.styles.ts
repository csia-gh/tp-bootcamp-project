import styled from 'styled-components';

export const Cards = styled.div<{ open: boolean; }>`
  display: grid;
  grid-template-columns: 1fr;
	gap: 1.875rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: ${({ open }) => open ? "repeat(2, minmax(300px, auto))" : "repeat(3, minmax(300px, auto)))"}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    grid-template-columns: ${({ open }) => open ? "repeat(3, minmax(300px, auto)))" : "repeat(4, minmax(300px, auto)))"}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;