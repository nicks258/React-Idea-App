import React from 'react';
import Logo from '../images/logo_coolshop_72_white.png'
import styled from "styled-components";
const Image = styled.img`
  height: 37px;
  width: 100%;
  background-size: cover;
`;
const Header = props => (
  <header className="header">

      <Image src={Logo} />

  </header>
);

export default Header;