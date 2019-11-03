import React, {Component, Fragment} from 'react'
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
    ButtonGroup,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Label} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ModalIniciarSesion from './Modal';
import ModalRegistro from './ModalRegistro';
import UserOptions from './UserOptions';

class Header extends Component {

    state = {
        isOpen: false,
        loginOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    
    render() {

        const {isAuthenticated} = this.props;
    
        return (
            <div>
                <header className="header">
                    <Navbar expand="lg" className="header__nav mb-5 py-3">
                        <Container className="header__nav__container pb-3">
                            <NavbarBrand className="anchor__header logo"><Link to={{pathname: "/"}}>TiendaBrgas</Link></NavbarBrand>
                            <NavbarToggler onClick={this.toggle} className="mr-2"/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem className="mr-4">
                                        <NavLink className="anchor__header"><Link to="/productos">Productos</Link></NavLink>
                                    </NavItem>
                                    <NavItem className="mr-4">
                                        <Form inline>
                                            <FormGroup>
                                                <Input type="text" name="busquedaNav" id="busquedaNav" placeholder="Busca un producto" className="mr-3" />
                                                <Button><FontAwesomeIcon icon="search" /></Button>
                                            </FormGroup>
                                        </Form>
                                    </NavItem>
                                    {
                                        (isAuthenticated) ? <UserOptions />
                                        :
                                        <Fragment>
                                            <NavItem>
                                                <ModalIniciarSesion />
                                            </NavItem>
                                            <NavItem>
                                                <ModalRegistro />
                                            </NavItem>
                                        </Fragment>
                                    }
                                </Nav>
                            </Collapse>        
                        </Container>
                    </Navbar>
                </header>
            </div>
        )
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps
)(Header);