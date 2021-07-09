import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App';
import { store } from './redux/helpers/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend }  from 'react-dnd-html5-backend';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend} store={store}>
    <App />
    </DndProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
