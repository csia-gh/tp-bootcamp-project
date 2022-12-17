import styled from 'styled-components'

export const TableImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 62px;
    height: 62px;
  }
`
