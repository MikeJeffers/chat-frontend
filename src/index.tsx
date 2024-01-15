//@ts-check
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import { store } from './store'
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);