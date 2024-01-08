import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './screens/Landing'
import Login from './screens/Login'
import Register from './screens/Register'
import ErrorBoundary from './error/ErrorBoundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
