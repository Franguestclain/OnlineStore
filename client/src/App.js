import React from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Productos from './components/Productos';
import Categorias from './components/Categorias';
import Home from './components/Home';

library.add(fas);

function App() {
  return (
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
      </Switch>
    </Router>
  );
}

export default App;
