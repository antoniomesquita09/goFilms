import React from 'react';
import { Provider } from 'react-redux'

import "./Global.css";
import store from './states/store'
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
