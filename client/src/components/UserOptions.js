import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {logout} from '../actions/userActions';

/**
 * TODO: Agregar opciones
 *  -Mostrar nombre y dropdown on hover con acceso a perfil y a acciones de sesion, favoritos,etc
 *  -Carrito de compras
 */

const UserOptions = (props) =>{

    const {
        user,
        logout
    } = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
       <Fragment>
           <NavItem>
               <FontAwesomeIcon icon="shopping-cart"/>
           </NavItem>
           <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                    {user.nombre}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Perfil</DropdownItem>
                    {
                        (user.admin) ? <DropdownItem><Link to={{pathname: '/inventario'}}>Inventario</Link></DropdownItem> : <DropdownItem>Historial de compras</DropdownItem>
                    }
                    <DropdownItem divider />
                    <DropdownItem onClick={logout}>Cerrar sesión</DropdownItem>
                </DropdownMenu>
           </Dropdown>
       </Fragment> 
    )
}

UserOptions.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { logout }
)(UserOptions);
