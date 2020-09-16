import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';

import {history} from './store';
import Home from './components/screens/Home';
import Navbar from './components/nav/Navbar';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import Spaces from './components/screens/Spaces';
import Space from './components/screens/Space';
import Profile from './components/screens/Profile';
import RequestConfirmation from './components/screens/RequestConfirmation';
import NotFound from './components/screens/NotFound';
import ScrollToTop from './components/misc/ScrollToTop';

import './App.scss';

function App() {
  return (
      <>
        <div className="App">
          <ReduxToastr timeOut={4000} transitionIn="fadeIn" transitionOut="fadeOut" />
          <ConnectedRouter history={history}>
            <ScrollToTop />
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/places" component={Spaces} />
              <Route exact path="/place/:id" component={Space} />
              <Route exact path="/request/:id/confirmation" component={RequestConfirmation} />
              <Route component={NotFound} />
            </Switch>
          </ConnectedRouter>
        </div>
        <footer>
          <div className="text-muted mb-2">
            Plafora
          </div>
        </footer>
      </>
  );
}

export default App;