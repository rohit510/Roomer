import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
//import * as serviceWorker from './ServiceWorker';
import reducer ,{initialState} from './reducer';
import {StateProvider} from './StateProvider';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <Main />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


//serviceWorker.unregister();