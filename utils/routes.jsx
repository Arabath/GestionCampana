import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminAuthProvider from '../admin/context/auth/AdminAuthProvider'
// import ProtectedRoute
import { routes } from './paths'
import AdminUnloggedRoute from '../admin/components/auth/AdminUnloggedRoute'
import AdminProtectedRoute from '../admin/components/auth/AdminProtectedRoute'

const NotFound = lazy(() => import('../common/components/NotFound'))
const FormZoonosis = lazy(() => import('../forms/zoonosis/layouts/FormContainer'))
const FormDiscapacidad = lazy(() => import('../forms/discapacidad/layouts/FormContainer'))
const AdminLogin = lazy(() => import('../admin/zoonosis/layouts/AdminLogin/'))
const ZoonosisDashboard = lazy(() => import('../admin/zoonosis/layouts/ZoonosisDashboard'))
const AdminDataDogs = lazy(() => import('../admin/zoonosis/layouts/AdminDataDogs/'))
const Panel = lazy(() => import('../admin/Panel'))

const VolquetesLogin = lazy(() => import('../forms/volquetes/layouts/UserLoginNuevo'))
const VolquetesLoginReset = lazy (() => import  ('../forms/volquetes/layouts/VolquetesLoginReset'))
const VolquetesNewPassword = lazy (() => import  ('../forms/volquetes/layouts/VolquetesNewPassword'))
const VolquetesUserDashboard = lazy (() => import  ('../forms/volquetes/layouts/VolquetesUserDashboard'))
const VolquetesUserLocation = lazy (() => import ('../forms/volquetes/layouts/VolquetesUserLocation'))
const FormVolquetes = lazy(() => import('../forms/volquetes/layouts/FormContainer'))
const VolquetesUserDataId = lazy (() => import ('../forms/volquetes/layouts/VolqueteUserData'))

const EpagosOk = lazy (() => import ('../forms/volquetes/layouts/EpagosOk'))
const EpagosError = lazy (() => import ('../forms/volquetes/layouts/EpagosError'))

const VolquetesDashboard = lazy(() => import('../admin/volquetes/layouts/VolquetesDashboard'))
const VolqueteData = lazy(() => import('../admin/volquetes/layouts/VolqueteData'))
const VolqueteHistorical = lazy(() => import('../admin/volquetes/layouts/VolqueteHistorical'))
const DiscapacidadDashboard = lazy(() => import('../admin/discapacidad/DiscapacidadDashboard'))
const DiscapacidadData = lazy(() => import('../admin/discapacidad/DiscapacidadData'))

const TransitoDashboard = lazy(() => import('../admin/transito/layout/TransitoDashboard'))

const DefRoutes = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path={routes.notFound} element={<NotFound />} />
        <Route path={routes.formZoonosis} element={<FormZoonosis />} />
        <Route 
          path={routes.volquetesLogin} 
          element={
              <VolquetesLogin />
          } 
        />
        <Route 
          path={routes.epagosOk} 
          element={
              <EpagosOk />
          } 
        />
        <Route 
          path={routes.epagosError} 
          element={
              <EpagosError />
          } 
        />
        <Route 
          path={routes.volquetesLoginReset} 
          element={
              <VolquetesLoginReset />
          } 
        />
        <Route 
          path={routes.volquetesNewPassword} 
          element={
              <VolquetesNewPassword />
          } 
        />  
        <Route 
          path={routes.volquetesUserDashboard} 
          element={
              <VolquetesUserDashboard />
          } 
        />  
        <Route 
          path={routes.volquetesUserLocation} 
          element={
              <VolquetesUserLocation />
          } 
        />
        <Route 
          path={routes.volquetesUserDataId}
          element={
            <VolquetesUserDataId />
          } 
        />
        <Route 
          path={routes.volquetesRegistration} 
          element={<FormVolquetes />}
        />
        <Route path={routes.discapacidad} element={<FormDiscapacidad />} />
        <Route
          path={routes.adminLogin}
          element={
            <AdminUnloggedRoute>
              <AdminLogin />
            </AdminUnloggedRoute>
          }
        />
        <Route
          path={routes.adminZoonosis}
          element={
            <AdminProtectedRoute>
              <ZoonosisDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={routes.adminZoonosisId}
          element={
            <AdminProtectedRoute>
              <AdminDataDogs />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={routes.adminDiscapacidad}
          element={
            <AdminProtectedRoute>
              <DiscapacidadDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={routes.adminDiscapacidadId}
          element={
            <AdminProtectedRoute>
              <DiscapacidadData />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={routes.adminPanel}
          element={
            <AdminProtectedRoute>
              <Panel />
            </AdminProtectedRoute>
          }
        />
          <Route
          path={routes.adminTransito}
          element={
            <AdminProtectedRoute>
              <TransitoDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={routes.adminVolquetes}
          element={
            <AdminProtectedRoute>
              <VolquetesDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={routes.adminVolquetesId}
          element={
            <AdminProtectedRoute>
              <VolqueteData />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={routes.adminHistorico}
          element={
            <AdminProtectedRoute>
              <VolqueteHistorical />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </AdminAuthProvider>
  )
}

export default DefRoutes
