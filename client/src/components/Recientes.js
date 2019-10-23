import React, { Component } from 'react'
import { getRecientes } from '../actions/itemActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, NavLink, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class Recientes extends Component {
    static propTypes = {
        getRecientes: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getRecientes();
    }

    render() {
        const {items} = this.props.item;
        return (
            <Container>
                <h3>Recientemente agregado: </h3>
                <Row>
                    {
                        items.map( item => (
                            <Col>
                                <Card>
                                    {/* TODO: Arreglar la ruta para las imagenes */}
                                    <CardImg top width="100%" src= {`../../../${item.imagenes[0].path}`}></CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            <Link to={`/producto/${item._id}`}><NavLink>{item.nombre}</NavLink></Link>
                                        </CardTitle>
                                        <CardText>{item.descripcion}</CardText>
                                        <Button>Comprar</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    }                    
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    item: state.item
})

export default connect(
    mapStateToProps,
    {getRecientes}
)(Recientes);