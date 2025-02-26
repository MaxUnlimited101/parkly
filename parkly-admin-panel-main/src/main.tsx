import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AuthentificatedLayout from '@/components/layout/authentificated-layout.tsx'
import { Provider } from 'react-redux';
import store from '@/store'

// pages 
import Dashboard from "@/app/dashboard/page.tsx";
import Users from "@/app/dashboard/users/page.tsx";
import ParkingAreas from '@/app/dashboard/parking-areas/page.tsx';
import ParkingSpots from '@/app/dashboard/parking-spots/page.tsx';
import Reservations from '@/app/dashboard/reservations/page.tsx';
// FIXME: Remove tasks
import Tasks from '@/app/dashboard/tasks/page.tsx';
// import Payments from "@/app/payments/page.tsx"
// import ComingSoon from '@/components/coming-soon.tsx'
import LoginPage from '@/app/login/page.tsx'

// errors
import NotFoundError from '@/features/errors/not-found-error'

// styles
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="/dashboard" />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/dashboard/" element={
                <AuthentificatedLayout />
              }>
              <Route index element={<Dashboard />} />
              <Route path='/dashboard/users' element={<Users />} />
              <Route path='/dashboard/reservations' element={<Reservations />} />
              <Route path='/dashboard/parking-spots' element={<ParkingSpots />} />
              <Route path='/dashboard/parking-areas' element={<ParkingAreas />} />
              <Route path='/dashboard/tasks' element={<Tasks />} />
              {/* <Route path="/dashboard/payments/" element={<Payments />} /> */}
            </Route>
            <Route path="*" element={<NotFoundError/>}/>
          </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
