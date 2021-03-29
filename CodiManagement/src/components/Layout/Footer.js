import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';
import codilogo from 'assets/img/logo/codi-logo.svg';


import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
         <SourceLink>
         
              <img
                src={codilogo}
                width="120"
                height="60"
                className="pr-2 ml-4"
                alt=""
              />
              Codi Tech Lebanon  About us 
              </SourceLink>
                          

             
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
