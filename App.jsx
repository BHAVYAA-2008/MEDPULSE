import { HashRouter, Route, Routes } from 'react-router-dom'
import { configured } from './lib/supabase'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import RequireRole from './components/RequireRole'
import SetupNotice from './components/SetupNotice'
import Home from './pages/Home'
import Login from './pages/Login'
import FamilyTrack from './pages/FamilyTrack'
import Patient from './pages/patient/Patient'
import Dashboard from './pages/hospital/Dashboard'
import Trip from './pages/ambulance/Trip'

export default function App() {
  if (!configured) return <SetupNotice />
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/track/:token" element={<FamilyTrack />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/hospital" element={<RequireRole role="hospital_admin"><Dashboard /></RequireRole>} />
            <Route path="/ambulance" element={<RequireRole role="driver"><Trip /></RequireRole>} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}
