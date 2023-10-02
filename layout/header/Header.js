import React, { useState, useContext } from "react";
import Image from "next/image";
import {
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse
} from "reactstrap";
import logo2 from "../../assets/images/logos/gb97-logo.png";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const {logout} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { isLoggedIn } = useContext(AuthContext)

  const salir = () => {
    logout();
    router.push("/");
  }

  return (
    <div className="topbar" id="top">
      <div className="header1 po-relative bg-primary">
        <Container>
          <Navbar className="navbar-expand-lg h2-nav">
            <NavbarToggler onClick={toggle}>
              <span className="ti-menu text-white"></span>
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar id="header1">
              <Nav navbar className="ml-auto mt-2 mt-lg-0">
                <NavItem className="active">
                  <NavLink href="/#">Inicio</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#About">Sobre Nosotros</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#Projects">Nuestro Proyecto</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#Features">Nuestras Aplicaciones</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#Organizations">Nuestras Organizaciones</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#Convenios">Nuestros Convenios</NavLink>
                </NavItem>
                {
                  isLoggedIn  
                  ?<>
                    <NavItem>
                      <NavLink href="/guia" >Video Guia</NavLink>
                    </NavItem>
                    <NavItem >
                      <a className="btn btn-info" onClick={salir}>
                        Salir
                      </a>
                    </NavItem>
                  </> 
                  : <NavItem>
                      <a className="btn btn-info" href="/acceso">
                        Licenciantes
                      </a>
                  </NavItem>
                }
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};

export default Header;
