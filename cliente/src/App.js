import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Catalogo from './components/Catalogo/Catalogo';

// Redux 
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Fragment>
      <Router>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/catalogo" component={Catalogo}></Route>
          </Switch>
        </Provider>
      </Router>
    </Fragment>
  );
}

export default App;
