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
                <h3 className="mb-5">Recientemente agregado:</h3>
                <Row>
                    {
                        items.map( item => (
                            <Col sm="12" md="3" className="mb-5">
                                <Card className="card__height card__height--recientes">
                                    {/* TODO: Arreglar la ruta para las imagenes */}
                                    <Link to={{
                                            pathname: `/producto/${item._id}`,
                                            state: {id: item._id}   
                                        }}><CardImg className="card__img card__img--recientes" top src= {`../../../${item.imagenes[0].path}`}></CardImg></Link>
                                    <CardBody className="cardbody__layout cardbody__layout--recientes">
                                        <CardTitle>
                                            <NavLink><Link to={{
                                                pathname: `/producto/${item._id}`,
                                                state: {id: item._id}
                                            }}>{item.nombre}</Link></NavLink>
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