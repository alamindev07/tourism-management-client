// import { createBrowserRouter } from 'react-router-dom'
// import MainLayout from '../layout/MainLayout'

// import Home from '../pages/Home/Home'
// import About from '../pages/About/About'
// import Trips from '../pages/Trips/Trips'
// import Community from '../pages/Community/Community'
// import Login from '../pages/Login/Login'
// import Register from '../pages/Register/Register'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { path: '/', element: <Home /> },
//       { path: '/about', element: <About /> },
//       { path: '/trips', element: <Trips /> },
//       { path: '/community', element: <Community /> },
//       { path: '/login', element: <Login /> },
//       { path: '/register', element: <Register /> },
//     ],
//   },
// ])

// export default router



import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import PrivateRoute from '../auth/PrivateRoute';

import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Trips from '../pages/Trips/Trips';
import Community from '../pages/Community/Community';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

import DashboardHome from '../pages/Dashboard/DashboardHome';

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
      { path: '', element: <DashboardHome /> }, // Default dashboard landing
      // Add role-based routes here later
    ],
  },
]);

export default router;

