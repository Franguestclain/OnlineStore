import React, { useState, useEffect } from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter,
        Input,Form,FormGroup,Label, Button, Row, Col, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {registrarUsuario} from '../actions/userActions';
import {clearErrors} from '../actions/errorActions';

const ModalRegistro = (props) => {

    const {
        registrarUsuario,
        error,
        clearErrors,
        isAuthenticated
    } = props;
    
    const [modal, setModal] = useState(false);
    const [campos, setCampos] = useState({
        nombre: '',
        email: '',
        password: '',
        password2: '',
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
            if(error.id === 'REGISTER_FAIL'){
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

        const {nombre, email, password, password2} = campos;

        // Crear un objeto usuario
        const newUser = {
            nombre,
            email,
            password,
            password2
        }

        //Intenta registrar
        registrarUsuario(newUser);
    }


    return (
        <div>
            <Button className="access__buttons__header" onClick={toggle} color="link"><FontAwesomeIcon icon="user-plus" className="mr-2"/> Registrarse</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Registrarse</ModalHeader>
                <ModalBody>
                    {
                        (campos.msg) ?
                        <Alert color="danger">{campos.msg}</Alert> : null
                    }
                    <Form name="registro" onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input type="text" name="nombre" id="nombre" placeholder="Nombre" onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Correo" onChange={onChange}/>
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="password">Contraseña</Label>
                                    <Input type="password" name="password" id="password" onChange={onChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="password2">Repetir contraseña</Label>
                                    <Input type="password" name="password2" id="password2" onChange={onChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Button className="mr-3" color="primary">Registrarse</Button>
                            <Button className="mr-3" onClick={toggle} color="danger">Cancelar</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

ModalRegistro.propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      registrarUsuario: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired   
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { registrarUsuario, clearErrors })(ModalRegistro);