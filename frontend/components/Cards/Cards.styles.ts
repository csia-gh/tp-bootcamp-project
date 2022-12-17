import styled from 'styled-components';

export const Cards = styled.div<{ open: boolean; }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1.875rem;

  margin-top: 2rem;

  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: ${({ open }) => open ? "repeat(2, 1fr)" : "repeat(3, 1fr)"}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    grid-template-columns: ${({ open }) => open ? "repeat(3, 1fr)" : "repeat(4, minmax(250px, 1fr))"}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;