import React from 'react';
import {history} from './store';
import {Switch, Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';

import Home from './components/screen/Home';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ReduxToastr timeout={4000} transitionIn="fadeIn" transitionOut="fadeOut" />
      <ConnectedRouter history={history}>
        <Switch>
          <Route to="/" component={Home} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;