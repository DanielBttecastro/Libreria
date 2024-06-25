import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  componentDidMount() {
    // Usar setInterval para verificar la variable de sesión cada 5 segundos
    this.interval = setInterval(() => {
      const sesionIniciada = localStorage.getItem('SesionIniciada') || null;
      let rol;
      if (sesionIniciada) { 
        const data = JSON.parse(sesionIniciada);
        rol = data.rol;
      }
      this.setState({ sesionIniciada });
      this.setState({ rol })
    }, 1000);
  }

  componentWillUnmount() {
    // Limpia el intervalo al desmontar el componente
    clearInterval(this.interval);
  }
  render() {

    const { sesionIniciada } = this.state;
    const { rol } = this.state;
    return (<>
      {sesionIniciada === null || sesionIniciada === undefined ? (
        <></>
      ) : (
        <header>
          <Navbar className=" nav-custom navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
            <NavbarBrand tag={Link} to="/">Final</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {rol === 1 ? (
                  <>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/Usuario">Usuario</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/Libros">Libros</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/Editoriales">Editoriales</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/Prestamos">Prestamos</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/">Cerrar sesion</NavLink>
                    </NavItem>
                  </>
                ) : rol === 2 ?(<>

                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/BuscarLibros">Buscar Libro</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Historial">Historial</NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">Cerrar sesion</NavLink>
                  </NavItem>

                </>

                ): null}
              </ul>
            </Collapse>
          </Navbar>
        </header>)
      }
    </>
    );
  }
}
