import styled from 'styled-components';


export const Card = styled.a`
  cursor: pointer;
  min-height: 281px;
  height: 100%;
  width: 100%;


  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1.2rem;
  color: #fff;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: .5s;

  &:hover {
    box-shadow: -2px -5px 4px rgba(0, 0, 0, 0.25), 2px 5px 5px rgba(115, 213, 151, 0.4);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: auto;
  }
`;


export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }
`;
export const CardContent = styled.div`
  margin-top: 1rem;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 1rem;
 
  max-height: 8rem;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  h2 {
    margin: 0;
    margin-bottom: 0.5rem;
    
    span {
      font-weight: 400;
      margin-right: 0.5rem;
    }

  }
`;
export const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
export const CardFooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
  }
`;
export const CardFooterRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 0.5rem;

  & > span {
    color: #73D597;
    margin-left: .5rem;
    font-weight: 600;
  }
`;