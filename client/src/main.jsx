import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';

import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import PortalPage from './pages/PortalPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Training from './pages/Training.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import SignUp from './pages/SignUp.jsx';
import Difficulty from './pages/Difficulty.jsx';
import Auth from './pages/Auth.jsx';
import auth from './utils/auth.js';
/**
 * Redirect an unauthenticated user
 */
function ProtectedRoute({ children }){
  const navigate = useNavigate()
  
  // Check if the user is logged in
  const isLoggedIn = auth.loggedIn()
  if(!isLoggedIn){
    // then navigate to /auth page
    navigate('/auth')
    return null
  }

  // renders the children
  return children
}

/**
 * Router setup
 * Insert more children as we go
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/portal',
        element: <PortalPage />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: '/training',
        element: <ProtectedRoute><Difficulty /></ProtectedRoute>,
      },
      {
        path: '/auth',
        element: <Auth/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
