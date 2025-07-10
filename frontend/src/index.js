import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Ant Design global styles
import 'antd/dist/reset.css';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Your own global styles (optional)
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
