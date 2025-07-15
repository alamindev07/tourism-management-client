// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import './index.css'
// import router from './routes/Routes'
// import { Toaster } from 'react-hot-toast'
// import AuthProvider from './context/AuthProvider'

// const queryClient = new QueryClient()

// ReactDOM.createRoot(document.getElementById('root')).render(
//  <>


//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <RouterProvider router={router} />
//       </AuthProvider>
//     </QueryClientProvider>
//   </React.StrictMode>

//          <Toaster />
//  </>
// )



import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import router from './routes/Routes';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/AuthProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
