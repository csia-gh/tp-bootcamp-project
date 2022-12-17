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
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 1rem 0;
  }
`;

export const NavbarLeft = styled.div<{ isOpen: boolean; }>`
  align-self: flex-start;
  padding-top: 2px;

  transition: 0.6s;
  transition-delay: 0.1s;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: ${({ isOpen }) => (isOpen ? '275px' : '50px')};
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


  &:hover {
    color: steelblue;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const PageTitle = styled.h1<{ isSubpage: boolean; hasAvatar: boolean}>`
  display: ${({ isSubpage }) => isSubpage ? 'inline-block' : 'none'};
  margin-top: 14px;
  margin-left: 1rem;
  font-size: 14px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-weight: 600;
    font-size: 2rem;
    margin: 0;
    display: inline-block;
    margin-top: ${({ hasAvatar }) => hasAvatar ? '-5px' : '0'};
  }
`;

export const Subtitle = styled.span`
  color: #73d597;

  &::before {
    content: '- ';
    color: #fff;
  }
`;


export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  position: relative;
  top: 9px;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: inline-block;
  }
`;