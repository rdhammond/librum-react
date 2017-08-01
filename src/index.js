import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from '../config';

ReactDOM.render(<App dataUrl={config.dataUrl} />, document.getElementById('root'));
registerServiceWorker();
