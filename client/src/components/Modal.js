import React, { useState, useEffect } from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter,
        Input,Form,FormGroup,Label, Button, Row, Col, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {login} from '../actions/userActions';
import {clearErrors} from '../actions/errorActions';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ModalIniciarSesion = (props) => {

    const {
        login,
        error,
        clearErrors,
        isAuthenticated
    } = props;
    
    const [modal, setModal] = useState(false);
    const [campos, setCampos] = useState({
        email: '',
        password: '',
        msg: null
    });

    // useEffect (reemplazo componentDidUpdate.....creo)
    useEffect(()=>{
        if(modal){
            if(isAuthenticated){
                toggle();
            }
        }

        if(error !== campos.error){ //No estoy seguro de que jale
            if(error.id === 'LOGIN_FAIL'){
                setCampos({
                    ...campos,
                    msg: error.msg.msg
                });
            }else{
                setCampos({
                    ...campos,
                    msg: null
                });
            }
        }

    }, [error, campos.msg, isAuthenticated]);

    const toggle = () =>{
        // Limpiar los errores
        clearErrors();
        setModal(!modal);
    };

    const onChange = e => setCampos({
        ...campos,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        
        const {email, password} = campos;

        const user = {
            email,
            password
        }

        // Intentar iniciar sesion
        login(user);
    }

    return (
        <div>
            <Button className="access__buttons__header" onClick={toggle} color="link"><FontAwesomeIcon icon="user-lock" className="mr-2"/> Iniciar sesión</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Iniciar Sesión</ModalHeader>
                <ModalBody>
                    {
                        (campos.msg) ?
                        <Alert color="danger">{campos.msg}</Alert> : null
                    }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input onChange={onChange} type="email" name="email" id="email" placeholder="Correo"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Contraseña</Label>
                            <Input onChange={onChange} type="password" name="password" id="password" />
                        </FormGroup>
                        <FormGroup>
                            <Button className="mr-3" color="primary">Iniciar</Button>
                            <Button className="mr-3" onClick={toggle} color="danger">Cancelar</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

ModalIniciarSesion.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login,clearErrors })(ModalIniciarSesion);