import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Catalogo from './components/Catalogo/Catalogo';
import Admin from './components/Administracion/Admin';
import NoPermitido from './components/NoPermitido/NoPermitido';
import { validarRol } from "./helpers/helpers";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          {validarRol('ADMIN_ROLE') ?
            <Route exact path="/admin" component={Admin}></Route>
            :
            <Route exact path="/error404" component={NoPermitido}></Route>
          }
          <Route
            exact path="/"
            component={Home}
          ></Route>
          <Route exact path="/catalogo" component={Catalogo}></Route>
        </Switch>
      </Router>
    </Fragment >
  );
}

export default App;

/**
 *
 *  const [esAdmin, setEsAdmin] = useState('ADMIN_ROLE');
    const [esUsuarioComun, setEsUsuarioComun] = useState('USER_ROLE');
return (
<Route
  render={props => esAdmin ?
    <ComponenteAdministrarUsuario {...props} /> :
    <Unauthorized {...props} />  }
 */