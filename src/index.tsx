import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NavbarComponent from './NavbarComponent/NavbarComponent';
import Sidebar from './SidebarComponent/SidebarComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NavbarComponent/>
    <Sidebar />
    <App />
  </React.StrictMode>
);

