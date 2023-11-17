import React, { useState, useContext } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Link from 'next/link';

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

  // if (typeof window !== 'undefined') {
  //   // El código dentro de este bloque se ejecutará solo en el lado del cliente
  //   const topbar = document.querySelector('.topbar');
  //   const scrollThreshold = 1; // Puedes ajustar esto según tu diseño
  
  //   window.addEventListener('scroll', () => {
  //     if (window.scrollY > scrollThreshold) {
  //       topbar.style.position = "fixed"
  //     } else {
  //       topbar.style.position = 'relative'; // Fondo transparente
  //     }
  //   });
  // }


  return (
    <div className="topbar" id="top">
      <div className="header1 po-relative">
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
                  <NavLink href="/nosotros">Nosotros</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#Projects">Proyectos</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                   Aplicaciones <i className="fa fa-angle-down m-l-5"></i>
                  </DropdownToggle>
                  <DropdownMenu className="b-none animated fadeInUp">
                    <DropdownItem>
                        <Link href={"/aplicaciones/[app]"} as="/aplicaciones/pedidos">
                          GB97 Pedidos Textil
                        </Link>
                      </DropdownItem>
                    <DropdownItem>
                      <Link href={"/aplicaciones/[app]"} as="/aplicaciones/reportes">
                          GB97 Reportes Textil
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href={"/aplicaciones/[app]"} as="/aplicaciones/track">
                          GB97 Track
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href={"/aplicaciones/[app]"} as="/aplicaciones/produccion">
                          GB97 Producción Textil
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href={"/aplicaciones/[app]"} as="/aplicaciones/alianza">
                          Alianza Común
                        </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                {/* <NavItem>
                  <NavLink href="/#Features">Nuestras Aplicaciones</NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink href="/#Organizations">Organizaciones</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#Convenios">Convenios</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#Demo">Demo</NavLink>
                </NavItem>
                {
                  isLoggedIn  
                  ?<>
                    <NavItem>
                      <NavLink href="/guia">Video Guia</NavLink>
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
