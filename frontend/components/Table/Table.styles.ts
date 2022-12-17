import styled from 'styled-components';


export const TableContainer = styled.div`
  overflow-x: scroll;
  width: 100%;
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 25px;
  color: #fff;

  min-width: 400px;
  width: 100%;

  font-size: 12px;


  & th, & td {
    text-align: center;

    border: 1px solid #fff;
    background-color: #261275;
  }

  & tr:first-child th {
    border-top: 0;
  }

  & tr:last-child td {
    border-bottom: 0;
  }

  & tr:first-child th:first-child {
    border-radius: 25px 0 0 0;
  }
  & tr:first-child th:last-child {
    border-radius:  0 25px 0 0;
  }
  & tr:last-child td {
    border-bottom: 0;
  }
  & tr td:first-child,
  & tr th:first-child {
    border-left: 0;
  }
  & tr td:last-child,
  & tr th:last-child {
    border-right: 0;
  }

  & tr:last-child td:first-child {
    border-radius: 0 0 0 25px;
  }
  & tr:last-child td:last-child {
    border-radius: 0 0 25px 0;
  }

  & th {
    padding: 1rem;
    text-align: center;
    font-size: 14px;
  }

  & td {
    padding: 1rem;
    text-align: center;
    font-weight: 400;
  }

  & tr {
    transition: .3s;
  }


  & tr:hover td {
    background-color: #522ee2;
  }


  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 14px;
    
    & th {
      padding: 1.5rem;
      font-size: 16px;
    }

    & td {
      padding: 1rem 1.25rem;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    font-size: 16px;

    & th {
      font-size: 18px;
    }

    & td {
      padding: 1.5rem 2rem;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {

    & th {
      font-size: 22px;
    }

    font-size: 20px;
  }
`;

