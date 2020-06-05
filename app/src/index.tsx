import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from 'containers/app/App';
import * as serviceWorker from 'serviceWorker';
import configureStore, { sagaMiddleware } from 'data-layer/configureStore';
import sagas from 'data-layer/sagas';

const store = configureStore({});

sagaMiddleware.run(sagas);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
