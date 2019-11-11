import React, {useState, useEffect} from 'react';
import {getItems} from '../actions/itemActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container,Row, Col, NavLink, Button, Table} from 'reactstrap';

const Inventario = (props) =>{

    const {
        getItems
    } = props;


    return (
        <div>
            <Container>
                <h1>Hola soy el inventario je</h1>
            </Container>
        </div>
    )
}


Inventario.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(
    mapStateToProps,
    { getItems }
)(Inventario);


