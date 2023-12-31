import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App';
import MedicPanel from './routes/MedicPanel'
import NewPacient from './routes/NewPacient';
import AuthUser from './routes/AuthUser';
import NewUser from './routes/NewUser';
import EditUser from './routes/EditUser'
import HomePage from './routes/HomePage';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'
import ErrorHandler from './routes/ErrorHandler';



const router = createBrowserRouter([{
  element: <App />,
  children: [
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/auth", 
      element: <AuthUser />,
    },
    {
      path: "/dashboard",
      element: <MedicPanel />
    },
    {
      path: "/pacients/new",
      element: <NewPacient />,
    },
    {
      path: "/user/register",
      element: <NewUser />,
    },
    {
      path: "/user/edit/",
      element: <EditUser />,
    },
    {
      path: "/*",
      element: <ErrorHandler />,
    }
  ],
},
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>
);

