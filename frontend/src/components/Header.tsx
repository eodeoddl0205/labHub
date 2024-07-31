import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

// Props 타입 정의
interface NavItem {
  tag: string;
  link: string;
  items?: NavItem[];
}

interface HeaderProps {
  notices: string[];
  title: string;
  navItems: NavItem[];
}

const HeaderContainer = styled.div`
  background-color: #282c34;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoTitle = styled(Link)`
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: #61dafb;
  }
`;

const NoticeBoard = styled.div`
  font-weight: 200;
  font-size: 1.2rem;
  margin: 0.5rem 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderNav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 200px;
    height: 100vh;
    background: #282c34;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    transition: right 0.3s ease;
    z-index: 1000;
  }
`;

const NavItemContainer = styled.div`
  position: relative;
`;

const NavBtn = styled.button`
  background: none;
  border: none;
  color: white;
  border-radius: 2rem;
  text-decoration: none;
  display: block;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    background: #61dafb;
    color: #282c34;
  }
`;

const NavLink = styled(Link)`
  color: white;
  border-radius: 2rem;
  text-decoration: none;
  display: block;
  padding: 0.6rem 1.2rem;
  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    background: #61dafb;
    color: #282c34;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  width: 150px;
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  color: #282c34;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: center;
  transition: background 0.3s ease;
  &:hover {
    background: #f1f1f1;
  }
`;

const Hamburger = styled.div<{ isOpen: boolean }>`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: white;
    margin: 3px;
    transition: all 0.3s ease;
    transform-origin: 1px;
    &:nth-child(1) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ isOpen }) => (isOpen ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  align-self: flex-end;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC<HeaderProps> = ({ notices, title = "LABHUB", navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [isLogging, setIsLogging] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [notices.length]);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    setIsLogging(!!accessToken);
  }, []);

  return (
    <HeaderContainer>
      <LogoTitle to="/">{title}</LogoTitle>
      <NoticeBoard>{notices[currentNoticeIndex]}</NoticeBoard>
      <Hamburger isOpen={isOpen} onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </Hamburger>
      <HeaderNav isOpen={isOpen}>
        <CloseButton onClick={closeMenu}>×</CloseButton>
        {navItems.map((item, index) => (
          <NavItemContainer key={index}>
            {item.items ? (
              <NavBtn onClick={() => toggleDropdown(index)}>{item.tag}</NavBtn>
            ) : (
              <NavLink to={item.link} onClick={closeMenu}>{item.tag}</NavLink>
            )}
            {item.items && (
              <DropdownMenu isOpen={openDropdown === index}>
                {item.items.map((subItem, subIndex) => (
                  <DropdownItem key={subIndex} to={item.link + subItem.link} onClick={closeMenu}>
                    {subItem.tag}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </NavItemContainer>
        ))}
        {
          isLogging ?
            <>
              <NavLink to={'/mypage'} onClick={closeMenu}>마이페이지</NavLink>
            </>
            :
            <>
              <NavLink to={'/register'} onClick={closeMenu}>회원가입</NavLink>
              <NavLink to={'/login'} onClick={closeMenu}>로그인</NavLink>
            </>
        }
      </HeaderNav>
    </HeaderContainer >
  );
};

export default Header;
