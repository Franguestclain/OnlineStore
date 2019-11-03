import React, { Component } from 'react';
import {getRecientes} from '../actions/itemActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Producto extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: {},
            like: false
        }
    }

    componentDidMount(){
        // FIXME: Valio pitillo, mantener el id del item en esta pagina
        this.props.getRecientes();
    }
    
    render() {
        const {id} = this.props.router.state;
        const [item] = this.props.item.items.filter(item => item._id === id);
        const settings = {
            customPaging: (i) => {
                return (
                    <a>
                        {
                          (typeof item !== "undefined") ?  
                            <img className="producto__img__preview" src={`../../../${item.imagenes[i].path}`} />
                            : <p>No hay</p>
                        }
                    </a>
                )
            },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        return (
            <div>
                {
                    (typeof item !== "undefined") ?
                        <Container className="my-3">
                            <Row>
                                <Col className="mb-5" sm="12" md="8">
                                    <Slider {...settings}>
                                        {item.imagenes.map(img => (
                                            <div>
                                                <img className="producto__img__preview" src={`../../../${img.path}`} />
                                            </div>
                                        ))}
                                    </Slider>
            
                                </Col>
                                <Col className="mb-5 p-5" sm="12" md="4">
                                    <h2 className="item__nombre">{item.nombre}</h2>
                                    <p className="item__descripcion">{item.descripcion}</p>
                                    <h3 className="item__precio mb-5">${item.precio}.00 MXN</h3>
                                    <Button className="boton__comprar mr-4" outline color="primary">Comprar</Button>
                                        {
                                            (this.state.like) ? 
                                            <Button className="boton__favoritos" color="link"><FontAwesomeIcon className="icono icono--selected fa-2x" icon="heart" /></Button>
                                            :
                                            <Button className="boton__favoritos" color="link"><FontAwesomeIcon className="icono far fa-2x" icon="heart" /></Button>
                                        }
                                </Col>
                            </Row>
                        </Container>
                        :
                        null
                }
            </div>
        )
    }
}

Producto.propTypes = {
    getRecientes: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    router: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    item: state.item,
    router: state.router.location
})

export default connect(
    mapStateToProps,
    {getRecientes}
)(Producto);