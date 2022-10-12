import styled from 'styled-components';


export const Pagination = styled.nav`
  margin-top: 5rem;
  margin-bottom: 5rem;
  margin-left: 0.5rem;
`;

export const Button = styled.button<{ active: boolean; }>`
  color: #fff;
  padding: 8px 16px;
  margin: 0 0.5rem;
  text-decoration: none;
  border: 1px solid #fff;
  background-color: ${({ active, theme }) => active ? theme.colors.secondary : 'transparent'};;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 0.5rem;

  &:hover, 
  &:active {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;