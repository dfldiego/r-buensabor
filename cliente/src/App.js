import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Catalogo from './components/Catalogo/Catalogo';
import Admin from './components/Administracion/Admin';
import { useDispatch, useSelector } from 'react-redux';


//Actions de Redux
import {
  validarRolAction,
} from './actions/userActions';

function App() {
  const dispatch = useDispatch();
  const rolUsuario = roleRequerido => dispatch(validarRolAction(roleRequerido));

  const rolUsuarioStore = useSelector(state => state.user.tieneRolRequerido);
  console.log(rolUsuarioStore);

  return (
    <Fragment>
      <Router>
        <Switch>
          {rolUsuario('ADMIN_ROLE') && rolUsuarioStore === 'ADMIN_ROLE' ?
            <Route exact path="/admin" component={Admin}></Route>
            :
            null
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