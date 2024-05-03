import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import LoginView from '@components/views/LoginView/LoginView';
import PrivateRoute from '@components/feature/auth/PrivateRoute/PrivateRoute';

/*
  Definimos un router con el objeto createBrowserRouter de react-router-dom. 
  Aquí se determinan las rutas que tendra nuestra app
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute/>,
    children: [
      {
        path: "/",
        element: <App/>,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginView/>,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
