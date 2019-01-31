/** @format */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createStore } from 'redux';
import todoApp from './src/store/reducers';
import { Provider } from 'react-redux';

let store = createStore(todoApp);
class MyApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => MyApp);
