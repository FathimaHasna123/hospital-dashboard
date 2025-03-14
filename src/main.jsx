import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboradPage from './pages/DashboradPage.jsx'
import DepartmentPage from './pages/DepartmentPage.jsx';
import { QueryClient, QueryClientProvider } from 'react-query'
import DoctorsPage from './pages/DoctorsPage.jsx'





const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'dashboard',
        element:<DashboradPage/>
      },
      {
        path:'department',
        element:<DepartmentPage/>
      },
      {
        path:'doctors',
        element:<DoctorsPage />
      },
    ]
  }
])







const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
<QueryClientProvider client={queryClient}>

<RouterProvider router={router}/>
</QueryClientProvider>
  </StrictMode>,
)
