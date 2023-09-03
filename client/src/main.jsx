import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Homepage from './pages/Homepage.jsx'
import './index.css'
import Training from './pages/Training.jsx'

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
        path: "Training",
        element: <Training/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
