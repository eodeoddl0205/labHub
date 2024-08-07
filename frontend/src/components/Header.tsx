import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const isLoggedIn = useMemo(() => !!Cookies.get('accessToken'), []);

  return (
    <FixdHeadr>

      <HeaderContainer>
        <LogoTitle to="/">LABHUB</LogoTitle>
        <Hamburger isOpen={isOpen} onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </Hamburger>
        <HeaderNav isOpen={isOpen}>
          <CloseButton onClick={closeMenu}>×</CloseButton>
          <NavItemContainer>
            <div>
              <NavLink to={'/currentsituation'}>현황</NavLink>
            </div>
            <div>
              <NavLink to={'/support/faq'}>FAQ</NavLink>
            </div>
          </NavItemContainer>
          <AuthLinks>
            {isLoggedIn ? (
              <>
                <div>
                  <NavLink to="/mypage" onClick={closeMenu}>마이페이지</NavLink>
                </div>
                <div>
                  <NavLink to="/alarm" onClick={closeMenu}>알람</NavLink>
                </div>
              </>
            ) : (
              <>
                <div>
                  <NavLink to="/register" onClick={closeMenu}>회원가입</NavLink>
                </div>
                <div>
                  <NavLink to="/login" onClick={closeMenu}>로그인</NavLink>
                </div>
              </>
            )}
          </AuthLinks>
        </HeaderNav>
      </HeaderContainer>
    </FixdHeadr>
  );
};

export default Header;

const FixdHeadr = styled.div`
  position : fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
`

const HeaderContainer = styled.div`
  background-color: #282c34;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background-color: #1c1c1c; /* Darker background for dark mode */
    color: #f0f0f0; /* Light grey text for contrast */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Stronger shadow for dark mode */
  }
`;

const LogoTitle = styled(Link)`
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #0D80A0;
  }

  @media (prefers-color-scheme: dark) {
    color: #f0f0f0; /* Light grey text for better contrast */
    &:hover {
      color: #39a2db; /* Brighter hover color */
    }
  }
`;

const HeaderNav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 2rem;
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 200px;
    height: 110vh;
    background: #282c34;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    transition: right 0.3s ease;
    z-index: 1000;
  }

  @media (prefers-color-scheme: dark) {
    @media (max-width: 768px) {
      background: #1c1c1c; /* Darker background for dark mode */
    }
  }
`;

const NavItemContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const NavLink = styled(Link)`
  color: white;
  border-radius: 2rem;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #0D80A0;
  }

  @media (prefers-color-scheme: dark) {
    color: #f0f0f0; /* Light grey text */
    &:hover {
      background: #39a2db; /* Brighter background on hover */
    }
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

  @media (prefers-color-scheme: dark) {
    span {
      background: #f0f0f0; /* Light grey color for the hamburger lines */
    }
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

  @media (prefers-color-scheme: dark) {
    color: #f0f0f0; /* Light grey text */
  }
`;

const AuthLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;