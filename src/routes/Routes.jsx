
// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';

import PrivateRoute from '../auth/PrivateRoute';
import RoleBasedRoute from './RoleBasedRoute';

import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Trips from '../pages/Trips/Trips';
import Community from '../pages/Community/Community';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

import AdminPanel from '../pages/Dashboard/Admin/AdminPanel';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';

import GuidePanel from '../pages/Dashboard/TourGuide/GuidePanel';
import AddPackage from '../pages/Dashboard/TourGuide/AddPackage';

import TouristPanel from '../pages/Dashboard/Tourist/TouristPanel';

import Unauthorized from '../pages/Unauthorized/Unauthorized';
import DashboardRedirect from '../pages/Dashboard/DashboardRedirect';
import AddStory from '../pages/Dashboard/Tourist/AddStory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/trips', element: <Trips /> },
      { path: '/community', element: <Community /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardRedirect /> },

      // Admin Routes
      {
        path: 'admin',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'admin/manage-users',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <ManageUsers />
          </RoleBasedRoute>
        ),
      },

      // Tour Guide Routes
      {
        path: 'guide',
        element: (
          <RoleBasedRoute allowedRoles={['tourguide']}>
            <GuidePanel />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'guide/add-package', // ✅ fixed: removed `dashboard/` prefix
        element: (
          <RoleBasedRoute allowedRoles={['tourguide']}>
            <AddPackage />
          </RoleBasedRoute>
        ),
      },

      // Tourist Route
      {
        path: 'tourist',
        element: (
          <RoleBasedRoute allowedRoles={['tourist']}>
            <TouristPanel />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'stories/add', // ✅ fixed: removed `dashboard/` prefix
        element: (
          <RoleBasedRoute allowedRoles={['tourist']}>
            <AddStory />
          </RoleBasedRoute>
        ),
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
]);

export default router;
