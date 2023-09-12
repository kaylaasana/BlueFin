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
import TrainingCanvas from './3D/Canvas/TrainingCanvas.jsx';
/**
 * Redirect an unauthenticated user
 */
function ProtectedRoute({ children }){
  // Check if the user is logged in
  const isLoggedIn = auth.loggedIn()
  // // comment the line above and uncomment the line below if you are bothered by the fact that you have to login
  // const isLoggedIn = true 
  if(!isLoggedIn){
    // then navigate to /auth page
    window.location.assign('/auth')
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
        path: '/training/main',
        element: <ProtectedRoute><Difficulty /></ProtectedRoute>,
      },
      {
        path: '/training/entrance',
        element: <TrainingCanvas/>
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
