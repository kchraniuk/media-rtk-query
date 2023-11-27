import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './App';

import './index.css';

const element = document.getElementById('root');
const root = createRoot(element);

root.render(
<Provider store={store}>
    <App />
</Provider>
);