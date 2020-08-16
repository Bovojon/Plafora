import React from 'react';
import {history} from './store';
import {Switch, Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';

import './App.scss';
import Home from './components/screens/Home';
import Navbar from './components/nav/Navbar';

const theme = createMuiTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ReduxToastr timeout={4000} transitionIn="fadeIn" transitionOut="fadeOut" />
        <ConnectedRouter history={history}>
          <Navbar />
          <Switch>
            <Route to="/" component={Home} />
          </Switch>
        </ConnectedRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;