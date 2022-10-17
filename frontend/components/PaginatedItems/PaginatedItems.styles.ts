import styled from 'styled-components';


export const Pagination = styled.nav`
  margin: 2rem 0;

  & ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    margin-left: 1.5rem;  
    margin-top: 5rem;
    margin-bottom: 5rem;
  }


  & a {
    display: block;
    color: #fff;
    padding: 8px 16px;
    margin: 0 0.5rem;
    text-decoration: none;
    border: 1px solid #fff;
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 0.5rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      padding: 12px 24px;
      font-size: 18px;
    }

    &:hover, 
    &:active {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  & li.active a {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  & li.disabled a {
    opacity: 0.5;
    cursor: auto;
  }
`;
