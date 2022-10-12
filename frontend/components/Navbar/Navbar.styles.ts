import styled from 'styled-components';

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 1rem;
  font-size: 32px;
  font-weight: 400;
  color: #fff;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 1rem 0 2rem;
  }
`;

export const NavbarLeft = styled.div<{ open: boolean; }>`
  align-self: flex-start;
  padding-top: 2px;

  transition: 0.6s;
  transition-delay: 0.025s;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: ${({ open }) => (open ? '275px' : '50px')};
  }
`;

export const NavbarRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
`;

export const OpenMenu = styled.span`
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;

  transition: 0.6s;

  &:hover {
    color: steelblue;
  }
`;

export const PageTitle = styled.h1`
  display: none;
  font-weight: 600;
  font-size: 2rem;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: inline-block;
  }
`;
