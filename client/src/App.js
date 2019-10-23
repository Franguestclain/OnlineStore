import React from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Productos from './components/Productos';
import Categorias from './components/Categorias';
import Home from './components/Home';
import Producto from './components/Producto';

import { Provider } from 'react-redux';
import store from './store';

library.add(fas);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/productos">
            <Productos />
          </Route>
          <Route path="/categorias">
            <Categorias />
          </Route>
          <Route path="/producto/:id" component={Producto} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
