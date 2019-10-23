import React, { Component } from 'react';
import {getById} from '../actions/itemActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class Producto extends Component {

    static propTypes = {
        getById: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    }
    
    componentDidMount(){
        this.props.getById(this.props.match.params.id);
    }
    
    
    render() {
        const [item] = this.props.item.items;
        return (
            <Container>
                <Row>
                    <Col sm="12" md="8">
                        <h3>{item.nombre}</h3>
                    </Col>
                    <Col sm="12" md="4">
                        <h3>{item.precio}</h3>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item
})

export default withRouter(connect(
    mapStateToProps,
    {getById}
)(Producto));