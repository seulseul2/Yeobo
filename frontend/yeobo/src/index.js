import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux';


const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);