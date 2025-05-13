import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from 'react';
import { Suspense } from 'react';
import NotFound from './components/NotFound.jsx';
const Dashboard = lazy(() => import('./components/Dashboard.jsx'));
const StudentDetails = lazy(() => import('./components/StudentDetails.jsx'));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main application component
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard/> {/* Lazy load VideoList component */}
          </Suspense>
        ),
      },
      {
        path: "/studentdetails/:id",
        element: (
          <Suspense fallback={<div>Loading Counter...</div>}>
            <StudentDetails/>
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />, // Handle 404 errors
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
