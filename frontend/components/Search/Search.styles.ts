import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0 0.5rem auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 0 0 0 auto;
  }
`;
export const SearchField = styled.input`
   width: 100%;
  padding: 10px 35px 10px 15px;
  border: none;
  border-radius: 100px;
  outline: none;
`;

export const SearchButton = styled.button<{ active: boolean; }>`
  background: transparent;
  border: none;
  outline: none;
  margin-left: -33px;
  color: #9C9C9C;
  cursor: ${({ active }) => active ? 'pointer' : 'none'};
`;;