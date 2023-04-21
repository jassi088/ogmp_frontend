import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider theme={{
      components: {
        Button: {
          colorPrimary: '#61ab36',
          colorPrimaryHover: '#61ab36',
          borderRadius: '2px',
        }
      },
      token: {
        borderRadius: '2px',
        colorPrimary: '#61ab36',

      }
    }} >
      <App />
    </ConfigProvider>
  </Provider>
);

