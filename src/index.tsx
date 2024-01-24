//@ts-check
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { store } from './store'
import FourOFour from './pages/FourOFour';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatTabs from './pages/ChatTabs';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark">
      <Notifications limit={5} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ChatTabs />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);