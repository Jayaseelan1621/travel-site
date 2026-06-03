import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Destinations from './pages/Services'
import TravelPackages from './pages/TravelPackages'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CancellationPolicy from './pages/CancellationPolicy'
import PackageDetail from './pages/PackageDetail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<TravelPackages />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cancellation" element={<CancellationPolicy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}