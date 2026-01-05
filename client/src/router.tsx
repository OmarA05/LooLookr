import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Navigate,
} from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ToiletPage from './pages/ToiletPage';
import ProtectedRoute from './components/layout/ProtectedRoute';

const routes: RouteObject[] = [
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/app', element: <Dashboard /> },
      { path: '/toilets/:id', element: <ToiletPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
];

const router = createBrowserRouter(routes);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
