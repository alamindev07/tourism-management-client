
// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';

import PrivateRoute from '../auth/PrivateRoute';
import RoleBasedRoute from './RoleBasedRoute';

import Home from '../pages/Home/Home';
import About from '../pages/About/AboutUs';
import Trips from '../pages/Trips/Trips';
import Community from '../pages/Community/CommunityPage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

import AdminPanel from '../pages/Dashboard/Admin/AdminPanel';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';

import GuidePanel from '../pages/Dashboard/TourGuide/GuidePanel';

import TouristPanel from '../pages/Dashboard/Tourist/TouristPanel';

import Unauthorized from '../pages/Unauthorized/Unauthorized';
import DashboardRedirect from '../pages/Dashboard/DashboardRedirect';
import AddStory from '../pages/Dashboard/Tourist/AddStory';
import ManageStories from '../pages/Dashboard/Tourist/ManageStories';
import ManageProfile from '../pages/Dashboard/Tourist/ManageProfile';
import AddPackage from '../pages/Dashboard/Admin/AddPackage';
import JoinAsGuide from '../pages/Dashboard/Tourist/JoinAsGuide';
import ManageCandidates from '../pages/Dashboard/Admin/ManageCandidates ';

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
        path: 'admin/manage-candidates',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <ManageCandidates />
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
       {
        path: 'admin/add-package',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <AddPackage></AddPackage>
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
        path: 'join-guide',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'tourguide', 'tourist']}>
            <JoinAsGuide />
          </RoleBasedRoute>
        ),
      },

      // Shared Routes (Profile, Stories) — available for all roles
      {
        path: 'profile',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'tourguide', 'tourist']}>
            <ManageProfile />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'stories/add',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'tourguide', 'tourist']}>
            <AddStory />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'manage-stories',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'tourguide', 'tourist']}>
            <ManageStories />
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
