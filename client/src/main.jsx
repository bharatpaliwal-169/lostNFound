import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//redux
import { Provider } from 'react-redux'
import reducers from './redux/reducers'
import { createStore , applyMiddleware , compose } from 'redux'
import thunk from 'redux-thunk';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
