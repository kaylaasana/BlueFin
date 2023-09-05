import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Homepage from './pages/Homepage.jsx'
import PortalPage from './pages/PortalPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Training from './pages/Training.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'

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
        element: <Homepage/>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: "/training",
        element: <Training/>
      },
      {
        path: '/portal',
        element: <PortalPage/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
