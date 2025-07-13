


// import { createBrowserRouter } from 'react-router-dom';
// import MainLayout from '../layout/MainLayout';
// import DashboardLayout from '../layout/DashboardLayout';
// import PrivateRoute from '../auth/PrivateRoute';

// import Home from '../pages/Home/Home';
// import About from '../pages/About/About';
// import Trips from '../pages/Trips/Trips';
// import Community from '../pages/Community/Community';
// import Login from '../pages/Login/Login';
// import Register from '../pages/Register/Register';

// import DashboardHome from '../pages/Dashboard/DashboardHome';

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
//   {
//     path: '/dashboard',
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     children: [
//       { path: '', element: <DashboardHome /> }, // Default dashboard landing
//       // Add role-based routes here later
//     ],
//   },
// ]);

// export default router;





import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import PrivateRoute from '../auth/PrivateRoute';
import RoleBasedRoute from '../auth/RoleBasedRoute'; // role-based access wrapper

import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Trips from '../pages/Trips/Trips';
import Community from '../pages/Community/Community';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

import DashboardHome from '../pages/Dashboard/DashboardHome';
import TouristPanel from '../pages/Dashboard/Tourist/TouristPanel';
import GuidePanel from '../pages/Dashboard/TourGuide/GuidePanel';
import AdminPanel from '../pages/Dashboard/Admin/AdminPanel';
import Unauthorized from '../pages/Unauthorized/Unauthorized';

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
       { path: '/unauthorized', element: <Unauthorized /> },
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

      // Role based routes:
      {
        element: <RoleBasedRoute allowedRoles={['tourist']} />,
        children: [{ path: 'tourist', element: <TouristPanel /> }],
      },
      {
        element: <RoleBasedRoute allowedRoles={['guide']} />,
        children: [{ path: 'guide', element: <GuidePanel /> }],
      },
      {
        element: <RoleBasedRoute allowedRoles={['admin']} />,
        children: [{ path: 'admin', element: <AdminPanel /> }],
      },
    ],
  },
]);

export default router;
