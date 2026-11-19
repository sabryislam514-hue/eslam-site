import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteProvider } from './context/SiteContext.jsx'
import Home from './pages/Home.jsx'
import Teacher from './pages/Teacher.jsx'
import Restaurant from './pages/Restaurant.jsx'
import Accessories from './pages/Accessories.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  )
}