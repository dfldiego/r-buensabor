import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Catalogo from './components/Catalogo/Catalogo';
import Admin from './components/Administracion/Admin';
import NoPermitido from './components/NoPermitido/NoPermitido';
import CatalogoFiltrado from './components/CatalogoFiltrado/CatalogoFiltrado';
import CatalogoInsumoPadre from './components/Catalogo/CatalogoInsumoPadre';
import CatalogoFiltradoInsumo from './components/CatalogoFiltrado/CatalogoFiltradoInsumos';

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/admin" component={Admin}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/catalogo" component={Catalogo}></Route>
          <Route exact path="/catalogo/:name" render={({ match }) => <CatalogoInsumoPadre name={match.params.name}></CatalogoInsumoPadre>}></Route>
          <Route exact path="/catalogoFiltrado/:name" render={({ match }) => <CatalogoFiltrado name={match.params.name}></CatalogoFiltrado>}></Route>
          <Route exact path="/catalogoFiltradoInsumo/:name" render={({ match }) => <CatalogoFiltradoInsumo name={match.params.name}></CatalogoFiltradoInsumo>}></Route>
          <Route exact path="/error404" component={NoPermitido}></Route>
        </Switch>
      </Router>
    </Fragment >
  );
}

export default App;