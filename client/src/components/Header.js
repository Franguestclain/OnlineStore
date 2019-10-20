import React, {Component} from 'react'
import {
    Container,
    Nav,
    Navbar,
    NavbarBrand, 
    NavbarToggler,
    NavItem,
    NavLink,
    Collapse,
    Form,
    FormGroup,
    Button,
    Input} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    
    render() {
    
        return (
            <header>
                <Navbar color="dark" dark expand="md" className="mb-5 py-3">
                    <Container>
                        <NavbarBrand><Link to="/">TiendaBrgas</Link></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem className="mr-4">
                                    <NavLink><Link to="/productos">Productos</Link></NavLink>
                                </NavItem>
                                <NavItem className="mr-4">
                                    <NavLink><Link to="/categorias">Categorias</Link></NavLink> 
                                </NavItem>
                                <NavItem className="mr-4">
                                    <Form inline>
                                        <FormGroup>
                                            <Input type="text" name="busquedaNav" id="busquedaNav" placeholder="Busca un producto" className="mr-3" />
                                            <Button><FontAwesomeIcon icon="search" /></Button>
                                        </FormGroup>
                                    </Form>
                                </NavItem>
                            </Nav>
                        </Collapse>        
                    </Container>
                </Navbar>
            </header>
        )
    }
}
