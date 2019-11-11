import React, {Component} from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {Switch, Route} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Header from './components/Header';
import Productos from './components/Productos';
import Categorias from './components/Categorias';
import Home from './components/Home';
import Producto from './components/Producto';
import Inventario from './components/Inventario';

import { Provider } from 'react-redux';
import configureStore, { history } from './store';
import { loadUser } from './actions/userActions'

library.add(fas);

class App extends Component {

  constructor(props){
    super(props);
    this.store = configureStore({});
  }
  
  componentDidMount(){
    this.store.dispatch(loadUser());
  }

  render(){
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/productos" component={Productos} />
            <Route path="/categorias" component={Categorias} />
            <Route path="/producto/:id" component={Producto} />
            <Route path="/inventario" component={Inventario} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App;
