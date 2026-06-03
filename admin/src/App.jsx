import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Packages from './pages/Packages'
import PackageForm from './pages/PackageForm'
import Gallery from './pages/Gallery'
import Enquiries from './pages/Enquiries'
import Layout from './components/Layout'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="packages" element={<Packages />} />
          <Route path="packages/new" element={<PackageForm />} />
          <Route path="packages/edit/:id" element={<PackageForm />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="enquiries" element={<Enquiries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}